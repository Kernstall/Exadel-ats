import {
  blue,
  red,
} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: blue,
    custom: {
      blackText: '#212121',
      grayText: '#757575',
      whiteText: '#FFFFFF',
      grayDivider: '#BDBDBD',
      dark: '#28639d',
      primary: '#1976d2',
      light: '#90caf9',
      accent: '#FFC107',
      background: '#d3d3d3',
      juicy: '#ff9100',
      juicySoft: '#ffab40',
    },
    secondary: red,
    background: red,
    error: red,
  },
});
