const PaymentAction = ({ payment, voidingId, onVoid, onViewVoid }) => {
  if (payment.isVoid)
    return (
      <button className="btn-edit" onClick={() => onViewVoid(payment)}>
        查看作廢
      </button>
    );
  if (payment.status === 0)
    return <span className="badge badge-pending">等待付款</span>;
  if (payment.status === 1)
    return (
      <button
        className="btn-delete"
        disabled={voidingId === payment.id}
        onClick={() => onVoid(payment)}
      >
        {voidingId === payment.id ? "處理中..." : "作廢"}
      </button>
    );
  if (payment.status === 2)
    return <span className="badge badge-inactive">付款失敗</span>;
  if (payment.status === 3)
    return <span className="badge badge-role">已退款</span>;
  return null;
};

export default PaymentAction;
