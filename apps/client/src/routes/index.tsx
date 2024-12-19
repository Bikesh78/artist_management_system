import { BrowserRouter, Route, Routes } from "react-router";
import {
  ArtistPage,
  Login,
  MusicPage,
  PageNotFound,
  RegisterPage,
  UserPage,
} from "src/pages";
import ProtectedRoutes from "./protected-routes";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<UserPage />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/artist/:artistId/music" element={<MusicPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
