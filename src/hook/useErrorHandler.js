import { useUI } from "../context/UIContext";

const useErrorHandler = () => {
  const { showToast } = useUI();

  const handleError = (err, fallback = "操作失敗，請稍後再試") => {
    const msg = err?.response?.data?.message || fallback;
    showToast("❌", msg);
    console.error(err);
  };

  return { handleError };
};

export default useErrorHandler;
