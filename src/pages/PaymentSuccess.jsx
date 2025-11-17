// src/pages/PaymentSuccess.jsx
import React,{ useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("verifying");
    const navigate = useNavigate();

    useEffect(() => {
        const resultIndicator = searchParams.get("resultIndicator");
        const storedIndicator = sessionStorage.getItem("meet_success_indicator");
        const orderId = sessionStorage.getItem("meet_order_id");
        const amount = sessionStorage.getItem("meet_amount");
        const email = sessionStorage.getItem("meet_email");

        if (!resultIndicator || !storedIndicator || !orderId) {
            setStatus("invalid");
            return;
        }

        if (resultIndicator !== storedIndicator) {
            setStatus("failed");
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/payment/verify/${orderId}`)
            .then((res) => {
                if (res.data.status === "AUTHORIZED") {
                    setStatus("success");
                    // You can show booking reference or email here using orderId / email
                    setTimeout(() => {
                        navigate("/"); // or /thank-you, /booking-details, etc.
                    }, 5000);
                } else {
                    setStatus("failed");
                }
            })
            .catch(() => setStatus("error"));
    }, []);

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full border">
                {status === "verifying" && (
                    <>
                        <div className="text-blue-500 text-5xl animate-spin mb-4">🔄</div>
                        <h2 className="text-xl font-semibold">Verifying Payment...</h2>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="text-green-500 text-6xl mb-4 animate-bounce">✅</div>
                        <h2 className="text-2xl font-bold text-green-600">Payment Successful</h2>
                        <p className="text-gray-600 mt-2">
                            Thank you! Your MeetSuite booking has been confirmed. You will be redirected shortly.
                        </p>
                    </>
                )}

                {status === "failed" && (
                    <>
                        <div className="text-red-500 text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
                        <p className="text-gray-600 mt-2">
                            Your payment could not be verified. Please try again or contact support.
                        </p>
                    </>
                )}

                {status === "invalid" && (
                    <>
                        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-yellow-600">Invalid Payment Data</h2>
                        <p className="text-gray-600 mt-2">
                            Required session data was missing or malformed.
                        </p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="text-red-500 text-6xl mb-4">🚫</div>
                        <h2 className="text-2xl font-bold text-red-600">Verification Error</h2>
                        <p className="text-gray-600 mt-2">
                            Something went wrong while verifying your payment. Please contact support.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
