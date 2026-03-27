import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ProfileCard from "../profile/ProfileCard";
import ProfileStats from "../profile/ProfileStats";
import EditDisplayName from "../profile/EditDisplayName";
import EditPassword from "../profile/EditPassword";
import PurchaseList from "../profile/PurchaseList";

const MOCK_PURCHASES = [
  {
    id: "1",
    name: "AI Prompt Pack Pro",
    price: 12,
    thumbnailUrl: "https://picsum.photos/400/220?1",
    categoryName: "AI 提示詞",
    purchasedAt: "2026/03/20",
  },
  {
    id: "2",
    name: "Dark UI Kit",
    price: 24,
    thumbnailUrl: "https://picsum.photos/400/220?2",
    categoryName: "UI 套件",
    purchasedAt: "2026/03/22",
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isGuest, openLogin } = useApp();

  if (isGuest())
    return (
      <div className="profile-page">
        <div className="empty-state">
          <div className="empty-icon">🔐</div>
          <h3>請先登入</h3>
          <p style={{ marginTop: "12px" }}>
            <button className="btn-primary" onClick={openLogin}>
              登入
            </button>
          </p>
        </div>
      </div>
    );

  return (
    <div className="profile-page">
      <ProfileCard user={user} />
      <ProfileStats purchases={MOCK_PURCHASES} />
      <EditDisplayName user={user} />
      <EditPassword />
      <PurchaseList purchases={MOCK_PURCHASES} />
      <button
        className="btn-outline"
        style={{ width: "100%", padding: "12px" }}
        onClick={() => navigate("/orders")}
      >
        查看我的訂單
      </button>
    </div>
  );
};

export default ProfilePage;
