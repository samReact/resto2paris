import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import theme from './material/theme';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
