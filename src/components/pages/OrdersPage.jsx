import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import EmptyState from "../ui/EmptyState";
import PageStatus from "../ui/PageStatus";
import { useMyOrders, useCancelOrder, useDownload } from "../../hook/useOrders";
import OrderReviewModal from "../modal/OrderReviewModal";
import DownloadModal from "../modal/DownloadModal";

const STATUS_CLASS = {
  0: "status-unpaid",
  1: "status-paid",
  2: "status-completed",
  3: "status-unpaid",
};

const getStatusLabel = (status) => {
  if (status === 0) return "未付款";
  if (status === 1) return "已付款";
  if (status === 2) return "已完成";
  return "已取消";
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const { isGuest, openLogin, showToast } = useApp();
  const { orders, loading, error, refetch } = useMyOrders();
  const { cancel, loading: cancelling } = useCancelOrder();
  const { downloads, loading: downloading, fetchDownload } = useDownload();
  const [reviewingOrder, setReviewingOrder] = useState(null);
  const [showDownload, setShowDownload] = useState(false);

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
              {getStatusLabel(order.status)}
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
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* 只有未付款才能取消 */}
              {order.status === 0 && (
                <button
                  className="btn-outline"
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.8rem",
                    color: "var(--danger)",
                    borderColor: "var(--danger)",
                  }}
                  disabled={cancelling}
                  onClick={() =>
                    cancel(order.id, () => {
                      showToast("✅", "訂單已取消");
                      refetch();
                    })
                  }
                >
                  取消訂單
                </button>
              )}
              {/* 已付款或已完成 → 下載 + 評論 */}
              {(order.status === 1 || order.status === 2) && (
                <>
                  <button
                    className="btn-cart"
                    style={{ whiteSpace: "nowrap" }}
                    disabled={downloading}
                    onClick={async () => {
                      await fetchDownload(order.id);
                      setShowDownload(true);
                      refetch();
                    }}
                  >
                    ⬇ 下載
                  </button>
                  <button
                    className="btn-review"
                    onClick={() => setReviewingOrder(order)}
                  >
                    💬 評論商品
                  </button>
                </>
              )}
              <div className="order-total">${order.totalAmount}</div>
            </div>
          </div>
        </div>
      ))}

      {/* 下載 Modal */}
      {showDownload && downloads && (
        <DownloadModal
          downloads={downloads}
          onClose={() => setShowDownload(false)}
        />
      )}

      {reviewingOrder && (
        <OrderReviewModal
          order={reviewingOrder}
          onClose={() => setReviewingOrder(null)}
          onSuccess={() => {
            showToast("✅", "評論已送出！");
            setReviewingOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default OrdersPage;
