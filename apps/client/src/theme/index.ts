import { createTheme, lighten } from "@mui/material/styles";
const mainColor = "#4559BD";

export const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
      light: lighten(mainColor, 0.5),
      contrastText: "#fff",
    },
    secondary: {
      main: "#4559BD",
    },
    background: {
      default: "#FFF",
    },
    common: {
      black: "#232323",
      white: "#fff",
    },
    error: { main: "#FF3B3B" },
    info: { main: "#0063F7" },
    success: { main: "#06C270" },
    warning: { main: "#FC7125" },
  },
  typography: {
    fontSize: 12,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontWeight: "500",
          fontSize: "12px",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          "& a": {
            textDecoration: "none",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "& a": {
            textDecoration: "none",
          },
          "& .MuiButtonBase-root": {
            color: "#383751",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#383751",
          minWidth: "40px",
          "& svg": {
            fontSize: "18px",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#383751",
          fontSize: "14px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "#383751",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#f6f6f6 !important",
          outline: "none",
          borderRadius: "3px",
          fontSize: "12px",
          "& input": {
            padding: "0px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "10px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.87)",
            borderWidth: "1px",
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0,0,0,0.23)",
            },
          },
        },
        notchedOutline: {
          outline: "none",
          borderRadius: "3px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "12px",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: ({ theme }) => ({
          "&.Mui-checked": {
            color: theme.palette.success.main,
          },
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&.MuiOutlinedInput-input": {
            padding: "0",
          },
        },
      },
    },
  },
});
