import { BrowserRouter, Route, Routes } from "react-router";
import { Login, PageNotFound } from "../pages";
import ProtectedRoutes from "./protected-routes";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}></Route>
        <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
