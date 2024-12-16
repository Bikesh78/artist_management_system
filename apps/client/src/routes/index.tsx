import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardPage, Login, PageNotFound, RegisterPage } from "src/pages";
import ProtectedRoutes from "./protected-routes";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
