import { useState } from "react";
import { useUpdatePassword } from "../../hook/useProfile";

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { loading, error, setError, submit } = useUpdatePassword();

  const handleSubmit = () => {
    setError(null);
    if (!currentPassword) {
      setError("請輸入目前密碼");
      return;
    }
    if (newPassword.length < 8) {
      setError("新密碼至少需要 8 個字元");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("新密碼與確認密碼不一致");
      return;
    }

    submit(currentPassword, newPassword, (message) => {
      setSuccess(message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(""), 2000);
    });
  };

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "24px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          marginBottom: "16px",
          color: "var(--cyan)",
        }}
      >
        修改密碼
      </div>
      {error && (
        <div
          style={{
            background: "rgba(255,77,109,0.1)",
            border: "1px solid rgba(255,77,109,0.3)",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "0.82rem",
            color: "var(--danger)",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          style={{
            fontSize: "0.82rem",
            color: "var(--green)",
            marginBottom: "12px",
          }}
        >
          ✓ {success}
        </div>
      )}
      <div className="form-group">
        <label>目前密碼</label>
        <input
          type="password"
          placeholder="••••••••"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>新密碼</label>
        <input
          type="password"
          placeholder="至少 8 字元"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>確認新密碼</label>
        <input
          type="password"
          placeholder="再輸入一次"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        className="btn-primary"
        style={{ width: "100%", padding: "12px" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "修改中..." : "修改密碼"}
      </button>
    </div>
  );
};

export default EditPassword;
