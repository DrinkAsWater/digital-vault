import { useState } from "react";
import { useUpdateDisplayName } from "../../hook/useProfile";

const EditDisplayName = ({ user }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [success, setSuccess] = useState("");
  const { loading, error, setError, submit } = useUpdateDisplayName();

  const handleSubmit = () => {
    if (!displayName.trim()) {
      setError("顯示名稱不能為空");
      return;
    }
    submit(displayName, (message) => {
      setSuccess(message);
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
        修改顯示名稱
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
        <label>顯示名稱</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <button
        className="btn-primary"
        style={{ width: "100%", padding: "12px" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "儲存中..." : "儲存"}
      </button>
    </div>
  );
};

export default EditDisplayName;
