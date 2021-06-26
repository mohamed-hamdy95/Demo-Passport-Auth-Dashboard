import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Snackbar } from 'utils/snackbar';
import NoConnection from 'utils/NoConnection';
import Routes from 'routes';
import { Provider } from 'react-redux';
import store from 'redux/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Snackbar>
          <CssBaseline />
          <NoConnection />
          <Routes />
        </Snackbar>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
