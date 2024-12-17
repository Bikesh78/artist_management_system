import { Box, CircularProgress } from "@mui/material";
import { ReactNode, Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { Layout } from "src/components/layout";

const isLoggedIn = () => {
  const access_token = localStorage.getItem("artist_access_token");
  return Boolean(access_token);
};

export default function ProtectedRoutes() {
  return isLoggedIn() ? (
    <Layout>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
}
