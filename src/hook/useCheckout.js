import { useState } from "react";
import {
  createOrder,
  createPayment,
  getPaymentByOrder,
} from "../utils/ApiFuction";
import { useCart } from "../context/CartContext";
import { useUI } from "../context/UIContext";

export const PAYMENT_PROVIDERS = {
  ECPAY: 0,
  LINEPAY: 1,
  CREDIT_CARD: 2,
  CVS: 3,
};

const useCheckout = (onSuccess, existingOrderId = null) => {
  const { sessionCart, clearCart } = useCart();
  const { showToast } = useUI();
  const [step, setStep] = useState("select");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cvsResult, setCvsResult] = useState(null);

  const selectProvider = (provider) => {
    setSelectedProvider(provider);
    if (provider === PAYMENT_PROVIDERS.CREDIT_CARD) {
      setStep("creditcard");
    } else {
      submitPayment({}, provider);
    }
  };

  const submitPayment = async (cardInfo = {}, provider = selectedProvider) => {
    setLoading(true);
    setError(null);
    try {
      // 有既有訂單就不建立新訂單
      let orderId = existingOrderId;
      let orderNo = null;

      if (!orderId) {
        const productIds = sessionCart.map((p) => p.id);
        const order = await createOrder(productIds);
        orderId = order.id;
        orderNo = order.orderNo;
      }

      const result = await createPayment(orderId, provider, cardInfo);

      if (provider === PAYMENT_PROVIDERS.CVS) {
        setCvsResult({ ...result, orderId });
        setStep("cvs-result");
      } else {
        if (!existingOrderId) clearCart();
        showToast(
          "✅",
          orderNo ? `付款成功！訂單 ${orderNo} 已建立` : "付款成功！",
        );
        onSuccess?.();
      }
    } catch (err) {
      setError(err.response?.data?.message || "付款失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep("select");
    setSelectedProvider(null);
    setError(null);
    setCvsResult(null);
  };

  return {
    step,
    selectedProvider,
    loading,
    error,
    cvsResult,
    selectProvider,
    submitPayment,
    reset,
  };
};

export default useCheckout;
