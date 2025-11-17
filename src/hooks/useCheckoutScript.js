// src/hooks/useCheckoutScript.js
import { useEffect, useState } from "react";

const CHECKOUT_SCRIPT_SRC =
    "https://cbcmpgs.gateway.mastercard.com/checkout/version/61/checkout.js";

const useCheckoutScript = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Already loaded?
        if (window.Checkout) {
            setReady(true);
            return;
        }

        const existing = document.querySelector(`script[src="${CHECKOUT_SCRIPT_SRC}"]`);
        if (existing) {
            existing.addEventListener("load", () => setReady(true));
            return;
        }

        const script = document.createElement("script");
        script.src = CHECKOUT_SCRIPT_SRC;
        script.async = true;
        script.onload = () => {
            setReady(true);
        };
        script.onerror = () => {
            console.error("Failed to load Mastercard Checkout script");
            setReady(false);
        };

        document.body.appendChild(script);

        return () => {
            // we usually leave script; do nothing on cleanup
        };
    }, []);

    return ready;
};

export default useCheckoutScript;
