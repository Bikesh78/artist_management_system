import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

const SIDEBAR_ARRAY = [
  { label: "User", url: "/", icon: <PersonIcon /> },
  { label: "Artist", url: "/artist", icon: <LibraryMusicIcon /> },
];

export const Sidebar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "220px",
        height: "100vh",
        overflow: "auto",
        flexShrink: "0",
        boxShadow: "-10px 20px 28px rgba(0,0,0,0.5)",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          "& img": { width: "70px", height: "70px" },
        }}
      ></Box>
      <List
        sx={{
          "& .active": {
            "& .MuiButtonBase-root": {
              background: "#4559BD",
              "& .MuiListItemIcon-root": {
                color: "white",
              },
              "& .MuiListItemText-root": {
                color: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
          },
        }}
      >
        {SIDEBAR_ARRAY.map((list) => (
          <NavLink to={list?.url} key={list.label}>
            <ListItemButton>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText primary={list?.label} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Box>
  );
};
