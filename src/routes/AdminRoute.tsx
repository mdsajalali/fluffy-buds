import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

const AdminRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("decode", decoded);
    if (decoded?.role === "admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
