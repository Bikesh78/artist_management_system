import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "../pages";
import ProtectedRoutes from "../pages/login/protected-routes";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
