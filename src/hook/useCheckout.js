import { useState } from "react";
import { checkout } from "../utils/ApiFuction";
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
      const productIds = sessionCart.map((p) => p.id);

      const payload = {
        productIds,
        provider,
        ...cardInfo,
      };

      const result = await checkout(payload);

      if (provider === PAYMENT_PROVIDERS.CVS) {
        // 超商 → 顯示繳費代碼
        clearCart();
        setCvsResult({ ...result, orderId: result.orderId });
        setStep("cvs-result");
      } else {
        // 其他 → 付款成功
        clearCart();
        showToast("✅", `付款成功！訂單 ${result.orderNo} 已建立`);
        onSuccess?.();
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 402) {
        setError("付款失敗，請確認卡片資訊");
      } else if (status === 404) {
        setError("找不到商品，請重新整理");
      } else {
        setError(err.response?.data?.message || "付款失敗，請稍後再試");
      }
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
