import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Time New Roman",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 32,
      lineHeight: "48px",
      letterSpacing: "0.05em",
      color: "#000000",
    },
    h2: {
      fontFamily: "Time New Roman",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 24,
      lineHeight: "34px",
      letterSpacing: 1,
      color: "#000000",
    },
    h3: {
      fontFamily: "Time New Roman",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "28px",
      letterSpacing: 0.2,
      color: "#000000",
    },
    h4: {
      fontFamily: "Time New Roman",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "28px",
      letterSpacing: 0.2,
      color: "#000000",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // h1: "h2",
          // h2: "h2",
          // h3: "h2",
          // h4: "h2",
          // h5: "h2",
          // h6: "h2",
          // subtitle1: "h2",
          // subtitle2: "h2",
          // body1: "span",
          // body2: "span",
        },
      },
    },
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 480,
      desktop: 1200,
    },
  },
});
