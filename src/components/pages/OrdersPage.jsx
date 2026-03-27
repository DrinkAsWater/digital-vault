import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import EmptyState from "../ui/EmptyState";
import PageStatus from "../ui/PageStatus";
import { useMyOrders } from "../../hook/useOrders";

const STATUS_CLASS = {
  Paid: "status-paid",
  Completed: "status-completed",
  Unpaid: "status-unpaid",
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const { isGuest, openLogin } = useApp();
  const { orders, loading, error } = useMyOrders();

  if (isGuest())
    return (
      <div className="orders-page">
        <EmptyState icon="🔐" title="請先登入查看訂單">
          <p style={{ marginTop: "12px" }}>
            <button className="btn-primary" onClick={openLogin}>
              登入
            </button>
          </p>
        </EmptyState>
      </div>
    );

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  if (!orders.length)
    return (
      <div className="orders-page">
        <EmptyState icon="📋" title="尚無訂單記錄">
          <p style={{ marginTop: "8px" }}>
            <button className="btn-primary" onClick={() => navigate("/store")}>
              開始購物
            </button>
          </p>
        </EmptyState>
      </div>
    );

  return (
    <div className="orders-page">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div className="order-no">訂單 {order.orderNo}</div>
            <div
              className={`order-status ${STATUS_CLASS[order.status] || "status-unpaid"}`}
            >
              {order.status}
            </div>
          </div>
          <div className="order-items-list">
            {order.items.map((item) => (
              <div key={item.id} className="order-item-chip">
                {item.productName}
                <span>×{item.quantity}</span>
                <strong>${item.subTotal}</strong>
              </div>
            ))}
          </div>
          <div className="order-footer">
            <div className="order-date">
              📅 {new Date(order.createdAt).toLocaleDateString("zh-TW")}
            </div>
            <div className="order-total">${order.totalAmount}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
