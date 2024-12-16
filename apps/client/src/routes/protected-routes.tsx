import { Navigate } from "react-router";

const isLoggedIn = () => {
  const access_token = localStorage.getItem("artist_access_token");
  return Boolean(access_token);
};

export default function ProtectedRoutes() {
  return isLoggedIn() ? <div>Layout</div> : <Navigate to="/login" />;
}
