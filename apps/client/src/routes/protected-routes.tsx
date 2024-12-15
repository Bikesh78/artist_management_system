import { Navigate } from "react-router";

const isLoggedIn = false;

export default function ProtectedRoutes() {
  return isLoggedIn ? <div>Layout</div> : <Navigate to="/login" />;
}
