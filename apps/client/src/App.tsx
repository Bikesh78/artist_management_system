import { CssBaseline } from "@mui/material";
import RouteList from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouteList />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
