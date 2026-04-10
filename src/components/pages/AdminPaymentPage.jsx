import { useState } from "react";
import PageStatus from "../ui/PageStatus";
import EmptyState from "../ui/EmptyState";
import VoidPaymentModal from "../admin/payment/VoidPaymentModal";
import PaymentAction from "../admin/payment/PaymentAction";
import { useAdminPayments } from "../../hook/useAdminPayments";
import VoidDetailModal from "../admin/payment/VoidDetailModal";

const PROVIDER_LABEL = {
  ECPay: "ECPay",
  LinePay: "LinePay",
  CreditCard: "信用卡",
  CVS: "超商",
};

const AdminPaymentPage = () => {
  const { payments, loading, error, voidPayment } = useAdminPayments();
  const [voidingId, setVoidingId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [viewingVoid, setViewingVoid] = useState(null);

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  const handleVoidConfirm = async (reason) => {
    setVoidingId(selectedPayment.id);
    await voidPayment(selectedPayment.id, reason);
    setVoidingId(null);
    setSelectedPayment(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">
            付款管理 <span>Payments</span>
          </div>
          <div className="admin-page-sub">共 {payments.length} 筆付款記錄</div>
        </div>
      </div>

      {payments.length === 0 ? (
        <EmptyState icon="💳" title="尚無付款記錄" />
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>用戶</th>
              <th>付款方式</th>
              <th style={{ textAlign: "right" }}>金額</th>
              <th>付款時間</th>
              <th style={{ textAlign: "center" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                    }}
                  >
                    {payment.orderNo}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                    {payment.userDisplayName}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      marginTop: "2px",
                    }}
                  >
                    {payment.userEmail}
                  </div>
                </td>
                <td>
                  <span className="badge badge-role">
                    {PROVIDER_LABEL[payment.provider] ?? payment.provider}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      color: "var(--cyan)",
                    }}
                  >
                    ${payment.amount}
                  </span>
                </td>
                <td style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                  {payment.paidAt
                    ? new Date(payment.paidAt).toLocaleDateString("zh-TW")
                    : "—"}
                </td>
                <td style={{ textAlign: "center" }}>
                  <PaymentAction
                    payment={payment}
                    voidingId={voidingId}
                    onVoid={setSelectedPayment}
                    onViewVoid={setViewingVoid}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedPayment && (
        <VoidPaymentModal
          payment={selectedPayment}
          onConfirm={handleVoidConfirm}
          onClose={() => setSelectedPayment(null)}
          loading={voidingId === selectedPayment.id}
        />
      )}
      {viewingVoid && ( // ← 新增
        <VoidDetailModal
          payment={viewingVoid}
          onClose={() => setViewingVoid(null)}
        />
      )}
    </div>
  );
};

export default AdminPaymentPage;
