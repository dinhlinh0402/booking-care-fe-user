import { styled, createTheme } from "@mui/system";
import * as images from "../../assets/index";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
});

export const HomeContainer = styled("div")({
  backgroundPosition: "center",
  backgroundImage: `url(${images.SearchBackground})`,
  backgroundColor: "#fff",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  boxShadow: "#ffffff 0px -60px 50px 0px inset",
  display: "flex",
  paddingBottom: 30,
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});
