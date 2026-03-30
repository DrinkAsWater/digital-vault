import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { usePurchases } from "../../hook/useProfile";
import ProfileCard from "../profile/ProfileCard";
import ProfileStats from "../profile/ProfileStats";
import EditDisplayName from "../profile/EditDisplayName";
import EditPassword from "../profile/EditPassword";
import PurchaseList from "../profile/PurchaseList";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isGuest, openLogin } = useApp();
  const { purchases } = usePurchases();

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
      <ProfileStats purchases={purchases} />
      <EditDisplayName user={user} />
      <EditPassword />
      <PurchaseList />
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
