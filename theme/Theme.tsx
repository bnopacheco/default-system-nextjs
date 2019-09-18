import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1B5E20",
    },
    secondary: {
      main: "#D50000",
    },
    background: {
      default: "#FFF",
    },
  },
});

export default theme;
