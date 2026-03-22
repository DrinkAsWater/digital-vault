import { useApp } from '../../context/AppContext';

const Toast = () => {
  const { toasts } = useApp();
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <span className="toast-icon">{t.icon}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

export default Toast;