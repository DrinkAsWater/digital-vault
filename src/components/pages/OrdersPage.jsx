import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import EmptyState from '../ui/EmptyState';

const OrdersPage = () => {
  const { orders, isGuest, openLogin} = useApp();
  const statusClass = s => s === "Paid" ? "status-paid" : s === "Completed" ? "status-completed" : "status-unpaid";
const navigate = useNavigate();
  if (isGuest()) return (
    <div className="orders-page">
      <EmptyState icon="🔐" title="請先登入查看訂單">
        <p style={{ marginTop: "12px" }}>
          <button className="btn-primary" onClick={openLogin}>登入</button>
        </p>
      </EmptyState>
    </div>
  );

  if (!orders.length) return (
    <div className="orders-page">
      <EmptyState icon="📋" title="尚無訂單記錄">
        <p style={{ marginTop: "8px" }}>
          <button className="btn-primary" onClick={() => navigate("/store")}>開始購物</button>
        </p>
      </EmptyState>
    </div>
  );

  return (
    <div className="orders-page">
      {orders.map(order => (
        <div key={order.OrderId} className="order-card">
          <div className="order-header">
            <div className="order-no">訂單 {order.OrderNo}</div>
            <div className={`order-status ${statusClass(order.Status)}`}>{order.Status}</div>
          </div>
          <div className="order-items-list">
            {order.items.map(item => (
              <div key={item.OrderItemId} className="order-item-chip">
                {item.ProductName}<span>×{item.Quantity}</span><strong>${item.SubTotal}</strong>
              </div>
            ))}
          </div>
          <div className="order-footer">
            <div className="order-date">📅 {order.CreatedAt} · {order.Payment.Provider}</div>
            <div className="order-total">${order.TotalAmount}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;