import AvatarUpload from "./AvatarUpload";
import { getAvatarUrl } from "../../utils/avatarHelper";
import { useAuth } from "../../context/AuthContext";
import { saveUser } from "../../utils/tokenHelper";

const ProfileCard = ({ user }) => {
  const { loginAs } = useAuth();

  const handleAvatarSuccess = (newAvatarUrl) => {
    const updatedUser = { ...user, avatarUrl: newAvatarUrl };
    saveUser(updatedUser);
    loginAs(updatedUser, user.provider);
  };

  return (
    <div className="profile-card">
      <AvatarUpload user={user} onSuccess={handleAvatarSuccess} />
      <div>
        <div className="profile-name">{user.displayName}</div>
        <div className="profile-email">{user.email}</div>
        <div className="provider-badge">
          {user.provider === 'Google' ? '🔵 Google 登入' : '🔑 Email 登入'} · {user.role}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;