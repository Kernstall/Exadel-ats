import { green, red, blue, cyan } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
    surface: blue,
    error: red,
  },
});
