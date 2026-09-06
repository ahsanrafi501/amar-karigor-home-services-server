import axios from "axios";
import config from "../../config";
import { prisma } from "../../lib/prisma";



const initiatePayment = async (
    payload: any,
    user: any
) => {
    const { id: userId } = user;
    const { bookingId } = payload;




    const userInfo = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!userInfo) {
        throw new Error(
            "Please register or login."
        );
    }




    const bookingInfo =
        await prisma.booking.findUnique({
            where: {
                id: bookingId,
            },
            include: {
                TechnicianService: true,
                payment: true,
            },
        });

    if (!bookingInfo) {
        throw new Error(
            "Book the technician first."
        );
    }



    if (bookingInfo.payment) {
        throw new Error(
            "Payment already completed for this booking."
        );
    }



    const amount = Number(
        bookingInfo.TechnicianService.price
    );

    if (!amount || amount < 10) {
        throw new Error(
            "Payment amount must be at least 10 BDT."
        );
    }



    const transactionId =
        `TXN_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 7)}`;


    const paymentData = {
        store_id:
            config.ssl_commerz_store_id,

        store_passwd:
            config.ssl_commerz_store_password,

        total_amount: amount,

        currency: "BDT",

        tran_id: transactionId,

        // Store booking ID
        value_a: bookingId,

        success_url:
            `${config.appUrl}/api/payment/success`,

        fail_url:
            `${config.appUrl}/api/payment/failed`,

        cancel_url:
            `${config.appUrl}/api/payment/cancelled`,

        cus_name:
            userInfo.name,

        cus_email:
            userInfo.email,

        cus_add1: "N/A",

        cus_add2: "N/A",

        cus_city: "Dhaka",

        cus_state: "Dhaka",

        cus_postcode: 1000,

        cus_country: "Bangladesh",

        cus_phone: "N/A",

        cus_fax: "N/A",

        shipping_method: "NO",

        product_name:
            "Home Service",

        product_category:
            "Service",

        product_profile:
            "general",
    };



    try {

        const params =
            new URLSearchParams();

        Object.entries(paymentData).forEach(
            ([key, value]) => {
                params.append(
                    key,
                    String(value)
                );
            }
        );


        const response =
            await axios.post(
                "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",

                params.toString(),

                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded",
                    },

                    timeout: 30000,
                }
            );


        // console.log(
        //     "SSL RESPONSE:",
        //     response.data
        // );



        if (
            !response.data?.GatewayPageURL
        ) {
            throw new Error(
                response.data?.failedreason ||
                response.data?.message ||
                "SSLCommerz payment initiation failed."
            );
        }


        return {
            paymentUrl:
                response.data.GatewayPageURL,

            transactionId:
                transactionId,

            bookingId:
                bookingId,
        };

    } catch (error: any) {

        // console.log(
        //     "SSL ERROR:",
        //     error.response?.data
        // );

        throw new Error(
            error.response?.data?.failedreason ||
            error.response?.data?.message ||
            error.message ||
            "SSLCommerz payment failed."
        );
    }
};




const paymentSuccess = async (
    payload: any
) => {

    console.log(
        "SSL SUCCESS"
    );

    console.log(
        "PAYLOAD:",
        payload
    );


    const {
        tran_id,
        val_id,
        value_a,
    } = payload;


    if (!tran_id) {
        throw new Error(
            "Transaction ID is missing."
        );
    }


    if (!val_id) {
        throw new Error(
            "Validation ID is missing."
        );
    }


    const validationResponse =
        await axios.get(
            "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
            {
                params: {
                    val_id: val_id,

                    store_id:
                        config.ssl_commerz_store_id,

                    store_passwd:
                        config.ssl_commerz_store_password,

                    format: "json",
                },

                timeout: 30000,
            }
        );


    const validation =
        validationResponse.data;


    // console.log(
    //     "VALIDATION:",
    //     validation
    // );



    if (
        validation.status !== "VALID" &&
        validation.status !== "VALIDATED"
    ) {
        throw new Error(
            "Payment validation failed."
        );
    }




    const bookingId =
        value_a ||
        validation.value_a;


    if (!bookingId) {
        throw new Error(
            "Booking ID not found."
        );
    }




    const result =
        await prisma.$transaction(
            async (tx) => {

            
       

                const existingPayment =
                    await tx.payment.findUnique({
                        where: {
                           bookingId,
                        },
                    });


                if (existingPayment) {
                    return existingPayment;
                }


            

                const booking =
                    await tx.booking.findUnique({
                        where: {
                            id: bookingId,
                        },

                        include: {
                            TechnicianService: true,
                        },
                    });


                if (!booking) {
                    throw new Error(
                        "Booking not found."
                    );
                }


            

                const bookingPayment =
                    await tx.payment.findUnique({
                        where: {
                            bookingId:
                                bookingId,
                        },
                    });


                if (bookingPayment) {
                    return bookingPayment;
                }



                const paidAmount =
                    Number(
                        validation.amount
                    );


                const bookingAmount =
                    Number(
                        booking
                            .TechnicianService
                            .price
                    );


                if (
                    paidAmount !==
                    bookingAmount
                ) {
                    throw new Error(
                        "Payment amount mismatch."
                    );
                }


           

                const payment =
                    await tx.payment.create({
                        data: {

                            amount:
                                paidAmount,

                            paymentMethod:
                                validation.card_type ||
                                validation.card_type_name ||
                                "SSLCommerz",

                            sslCommerceCustomerId:
                                validation.cus_id ||
                                booking.customerId,

                            sslcommerceTranId:
                                tran_id,

                            bookingId:
                                bookingId,

                            provider:
                                "sslcommerz",
                        },
                    });


                return payment;
            }
        );


    // console.log(
    //     "PAYMENT CREATED:",
    //     result
    // );

    console.log(
        "PAYMENT CREATED"
    );


    return result;
};




const paymentFailed = async (
    payload: any
) => {

    console.log(
        "SSL PAYMENT FAILED"
    );

    console.log(
        payload
    );


    return {
        success: false,

        message:
            "Payment failed.",

        transactionId:
            payload.tran_id || null,

        bookingId:
            payload.value_a || null,
    };
};






const paymentCancelled = async (
    payload: any
) => {

    console.log(
        "SSL PAYMENT CANCELLED"
    );

    console.log(
        payload
    );


    return {
        success: false,

        message:
            "Payment cancelled.",

        transactionId:
            payload.tran_id || null,

        bookingId:
            payload.value_a || null,
    };
};



export const paymentService = {

    initiatePayment,

    paymentSuccess,

    paymentFailed,

    paymentCancelled,
};