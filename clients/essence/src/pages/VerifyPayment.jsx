import React, { useState, useEffect } from "react";
import { verifyPayment } from "../services/checkoutService";
import useAxiosWithStore from "../api/hooks/useAxiosWithStore";

const VerifyPayment = () => {
  const axios = useAxiosWithStore();
  const [firstRender, setFirstRender] = useState(true);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const transactionRef = urlSearchParams.get("trxref");

  useEffect(() => {
    const callVerifyPayment = async () => {
      try {
        // Check if the backend call has already been made
        const hasCallBeenMade = sessionStorage.getItem("paymentCallMade");

        if (!hasCallBeenMade) {
          // Make the backend call only if it hasn't been made before
          const response = await verifyPayment(axios, transactionRef);

          sessionStorage.setItem("paymentCallMade", "true"); // Set flag in storage
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (firstRender) {
      callVerifyPayment();
      setFirstRender(false);
    }
  }, [firstRender, transactionRef]);

  return (
    <div>
      <p>Payment successful</p>
    </div>
  );
};

export default VerifyPayment;
