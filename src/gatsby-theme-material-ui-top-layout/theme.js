import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue[500],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
