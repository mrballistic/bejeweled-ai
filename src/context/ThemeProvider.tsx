import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1A1A2E',
      paper: '#16213E',
    },
    primary: {
      main: '#60C8FF',
    },
    secondary: {
      main: '#C060FF',
    },
  },
  typography: {
    fontFamily: "'Rajdhani', sans-serif",
    h1: { fontFamily: "'Orbitron', sans-serif" },
    h2: { fontFamily: "'Orbitron', sans-serif" },
    h3: { fontFamily: "'Orbitron', sans-serif" },
    h4: { fontFamily: "'Orbitron', sans-serif" },
    h5: { fontFamily: "'Orbitron', sans-serif" },
    h6: { fontFamily: "'Orbitron', sans-serif" },
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
