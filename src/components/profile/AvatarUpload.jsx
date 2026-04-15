import { useRef, useState } from "react";
import { uploadAvatar } from "../../utils/ApiFunction";
import { getAvatarUrl } from "../../utils/avatarHelper";
import { useUI } from "../../context/UIContext";

const AvatarUpload = ({ user, onSuccess, size = 80 }) => {
  const { showToast } = useUI();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      showToast("❌", "只支援 JPG、PNG、WebP 格式");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast("❌", "圖片大小不能超過 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setFileInfo({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1),
        type: file.type.split("/")[1].toUpperCase(),
      });
      setShowModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadAvatar(file);
      showToast("✅", "頭像已更新");
      handleClose();
      onSuccess?.(data.avatarUrl);
    } catch (err) {
      showToast("❌", err.response?.data?.message || "上傳失敗");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPreview(null);
    setFileInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReselect = () => {
    setShowModal(false);
    setPreview(null);
    setFileInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  const currentAvatar = getAvatarUrl(user?.avatarUrl);

  return (
    <>
      {/* 頭像顯示 */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid var(--cyan)",
          cursor: "pointer",
          position: "relative",
          flexShrink: 0,
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {currentAvatar ? (
          <img
            src={currentAvatar}
            alt="頭像"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--cyan-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Syne', sans-serif",
              fontSize: `${size * 0.4}px`,
              fontWeight: 800,
              color: "var(--cyan)",
            }}
          >
            {user?.displayName?.[0]?.toUpperCase()}
          </div>
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            opacity: 0,
            transition: ".2s",
            borderRadius: "50%",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              color: "white",
            }}
          >
            +
          </div>
          <div style={{ fontSize: "10px", color: "white" }}>更換</div>
        </div>
      </div>

      {/* 隱藏 file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* 預覽 Modal */}
      {showModal && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="avatar-modal-title"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="modal">
            <button
              className="modal-close"
              onClick={handleClose}
              aria-label="關閉"
            >
              ✕
            </button>
            <div className="modal-logo" aria-hidden="true">
              DIGITAL VAULT
            </div>
            <h3 id="avatar-modal-title">更換頭像</h3>
            <p className="modal-sub">確認後將上傳新頭像</p>

            {/* 預覽頭像 */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                margin: "20px auto",
                border: "3px solid var(--cyan)",
                overflow: "hidden",
                background: "var(--cyan-dim)",
              }}
            >
              <img
                src={preview}
                alt="預覽"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* 檔案資訊 */}
            {fileInfo && (
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--cyan)",
                    flexShrink: 0,
                  }}
                />
                {fileInfo.name} · {fileInfo.size} MB · {fileInfo.type}
              </div>
            )}

            {/* 按鈕 */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <button
                className="btn-submit"
                onClick={handleUpload}
                disabled={uploading}
                aria-busy={uploading}
              >
                {uploading ? "上傳中..." : "確認上傳"}
              </button>
              <button
                className="btn-cancel"
                onClick={handleReselect}
                disabled={uploading}
              >
                取消，重新選擇
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarUpload;
