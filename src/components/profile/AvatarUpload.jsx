import { useRef, useState } from "react";
import { uploadAvatar } from "../../utils/ApiFuction";
import { getAvatarUrl } from "../../utils/avatarHelper";
import { useUI } from "../../context/UIContext";

const AvatarUpload = ({ user, onSuccess }) => {
  const { showToast } = useUI();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 驗證檔案類型
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast("❌", "只支援 JPG、PNG、WebP 格式");
      return;
    }

    // 驗證檔案大小（2MB）
    if (file.size > 2 * 1024 * 1024) {
      showToast("❌", "圖片大小不能超過 2MB");
      return;
    }

    // 預覽
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await uploadAvatar(file);
      showToast("✅", "頭像已更新");
      setPreview(null);
      onSuccess?.(data.avatarUrl);
    } catch (err) {
      showToast("❌", err.response?.data?.message || "上傳失敗");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const currentAvatar = getAvatarUrl(user?.avatarUrl);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      {/* 頭像顯示 */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid var(--cyan)',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={() => !preview && fileInputRef.current?.click()}
      >
        {preview || currentAvatar ? (
          <img
            src={preview ?? currentAvatar}
            alt="頭像"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--cyan-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.8rem',
            fontWeight: 800,
            color: 'var(--cyan)',
          }}>
            {user?.displayName?.[0]?.toUpperCase()}
          </div>
        )}

        {/* hover 提示 */}
        {!preview && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: '.2s',
            fontSize: '0.7rem',
            color: 'white',
            borderRadius: '50%',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0}
          >
            更換
          </div>
        )}
      </div>

      {/* 隱藏的 file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* 預覽後的操作按鈕 */}
      {preview && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn-submit"
            style={{ padding: '6px 16px', fontSize: '0.82rem', marginTop: 0 }}
            disabled={uploading}
            onClick={handleUpload}
          >
            {uploading ? '上傳中...' : '確認上傳'}
          </button>
          <button
            className="btn-cancel"
            style={{ padding: '6px 16px', fontSize: '0.82rem' }}
            onClick={handleCancel}
          >
            取消
          </button>
        </div>
      )}

      {!preview && (
        <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
          點擊頭像更換，支援 JPG / PNG / WebP，最大 2MB
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;