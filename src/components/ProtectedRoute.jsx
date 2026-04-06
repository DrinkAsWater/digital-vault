import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

export const AuthRoute = ({ children }) => {
  const { isGuest } = useAuth();
  const { openLogin } = useUI();

  if (isGuest()) {
    openLogin();
    return <Navigate to="/" />;
  }
  return children;
};

export const AdminRoute = ({ children, require = "admin" }) => {
  const { isGuest, user } = useAuth();

  if (isGuest()) return <Navigate to="/" />;

  const roles = user?.role?.split(",").map((r) => r.trim()) ?? [];

  const allowed = {
    admin: roles.includes("admin"),
    manager: roles.some((r) => ["admin", "manager"].includes(r)),
    support: roles.some((r) => ["admin", "support"].includes(r)),
  };
  console.log("AdminRoute - roles:", roles);
  console.log("AdminRoute - allowed:", allowed);

  if (!allowed[require]) return <Navigate to="/" />;
  return children;
};
