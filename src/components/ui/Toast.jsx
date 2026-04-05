import { useUI } from "../../context/UIContext";

const Toast = () => {
  const { toasts } = useUI();
  return (
    <div className="toast-wrap" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className="toast" role="alert">
          <span className="toast-icon" aria-hidden="true">
            {t.icon}
          </span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;
