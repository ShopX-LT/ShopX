import React, { useEffect } from "react";
import axios from "../api/axios";
import { verifyPayment } from "../services/checkoutService";

const VerifyPayment = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const transactionRef = urlSearchParams.get("trxref");

  useEffect(() => {
    const callVerifyayment = async () => {
      const response = await verifyPayment(transactionRef);
    };
    callVerifyayment();
  }, []);

  return (
    <div>
      <p>Payment successful</p>
    </div>
  );
};

export default VerifyPayment;
