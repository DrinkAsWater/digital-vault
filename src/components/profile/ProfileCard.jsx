const ProfileCard = ({ user }) => (
  <div className="profile-card">
    <div className="profile-avatar">{user.displayName[0].toUpperCase()}</div>
    <div>
      <div className="profile-name">{user.displayName}</div>
      <div className="profile-email">{user.email}</div>
      <div className="provider-badge">🔑 Email 登入 · {user.role}</div>
    </div>
  </div>
);

export default ProfileCard;
