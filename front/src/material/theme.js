import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#57687c",
      main: "#2c3e50",
      dark: "#031828",
      contrastText: "#fff"
    },
    secondary: {
      light: "#fa6b59",
      main: "#c1392f",
      dark: "#8a0007",
      contrastText: "#fff"
    },
    background: {
      default: "rgb(243, 243, 242);"
    }
  },
  infoColor: {
    color: "rgb(0,158,224)",
    marginLeft: 15
  },
  typography: {
    // fontSize: 25
  }
});
export default theme;
