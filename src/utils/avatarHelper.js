const BACKEND_URL = "https://localhost:7124";

export const getAvatarUrl = (avatarUrl) => {
  if (!avatarUrl) return null;
  // 已經是完整 URL 就直接用（Google OAuth 回傳的）
  if (avatarUrl.startsWith("http")) return avatarUrl;
  // 相對路徑加上後端 baseUrl
  return `${BACKEND_URL}${avatarUrl}`;
};