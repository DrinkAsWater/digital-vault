// 判斷是否有指定角色（支援多角色逗號分隔）
export const hasRole = (user, role) => {
  if (!user?.role) return false;
  return user.role
    .split(",")
    .map((r) => r.trim())
    .includes(role);
};

// 常用角色判斷
export const isAdmin = (user) => hasRole(user, "admin");
export const isManager = (user) =>
  hasRole(user, "admin") || hasRole(user, "manager");
export const isSupport = (user) =>
  hasRole(user, "admin") || hasRole(user, "support");
