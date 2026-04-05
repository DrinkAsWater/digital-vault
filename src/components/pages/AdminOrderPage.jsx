import EmptyState from "../ui/EmptyState";
import PageStatus from "../ui/PageStatus";

const STATUS_CLASS = {
  0: "status-unpaid",
  1: "status-paid",
  2: "status-completed",
};

const getStatusLabel = (status) => {
  if (status === 0) return "未付款";
  if (status === 1) return "已付款";
  if (status === 2) return "已完成";
  return "已取消";
};

const AdminOrderPage = () => {
  const orders = [];
  const loading = false;
  const error = null;

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  return (
    <div style={{ padding: "60px", maxWidth: "1000px", margin: "0 auto" }}>
      <div className="page-title" style={{ padding: "0 0 32px 0" }}>
        訂單管理 <span>Orders</span>
      </div>

      {orders.length === 0 ? (
        <EmptyState icon="📋" title="尚無訂單資料">
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              color: "var(--muted)",
            }}
          >
            等待後端 API 串接完成
          </p>
        </EmptyState>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-no">訂單 {order.orderNo}</div>
              <div className={`order-status ${STATUS_CLASS[order.status]}`}>
                {getStatusLabel(order.status)}
              </div>
            </div>
            <div className="order-footer">
              <div className="order-date">
                {new Date(order.createdAt).toLocaleDateString("zh-TW")}
              </div>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <button className="btn-edit">查看詳情</button>
                <div className="order-total">${order.totalAmount}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrderPage;
