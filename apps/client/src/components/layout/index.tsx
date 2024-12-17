import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

type Props = {
  children: ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: "1",
              width: "calc(100vw - 250px)",
              marginLeft: "250px",
            }}
          >
            <Navbar />
            <Container maxWidth="xl">
              <Box>{children}</Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
};
