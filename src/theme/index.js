import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      ss: 0,
      xs: 380,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#0D93BC',
    },
    secondary: {
      main: '#EF7D00',
    },
    tertiary: {
      main: '#E45008',
    },
    background: {
      default: 'rgb(232, 232, 239)',
    },
    text: {
      primary: '#000',
      secondary: '#323333',
      tertiary: '#2D2C2C',
      quat: '#81807F',
    },
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
