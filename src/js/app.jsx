import React from 'react';
import ReactDOM from 'react-dom';
import Theme from "./theme.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppRouter from './router.js';

function bootstrap_app() {
  ReactDOM.render(
      <MuiThemeProvider muiTheme={Theme()}>
        <AppRouter/>
      </MuiThemeProvider>,
      document.getElementById("app")
  );
}

if(document.attachEvent)
  document.attachEvent("onreadystatechange",bootstrap_app);
else
  document.addEventListener("DOMContentLoaded",bootstrap_app)
