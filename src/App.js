import React from 'react';
import './App.css';
import PageController from './Components/PageController.js'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

function App() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#ec4d37',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        //light: '#0066ff',
        main: '#1d1b1b',
        // dark: will be calculated from palette.secondary.main,
        //contrastText: '#ffcc00',
      },
      // error: will use the default color
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PageController />
      </ThemeProvider>
    </div>
  );
}

export default App;
