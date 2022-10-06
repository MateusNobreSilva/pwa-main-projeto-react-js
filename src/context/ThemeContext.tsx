import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/data-grid';

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#1a73e8',
        light: '#3c44b126',
      },
      secondary: {
        main: '#f83245',
        light: '#f8324526',
      },
      background: {
        default: '#fff',
      },
    },
    overrides: {
      MuiAppBar: {
        root: {
          transform: 'translateZ(0)',
        },
      },
    },
    props: {
      MuiIconButton: {
        disableRipple: false,
      },
    },
  },
  ptBR,
);

export { ThemeProvider, theme };
