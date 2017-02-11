import express from 'express';
import request from 'request';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, createRoutes} from 'react-router';
import Theme from "./js/theme.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import AppRouter from './js/router.js';

const routes = createRoutes(AppRouter());
const router = express.Router();

function static_url_pool(url,meta) {
  return function(cb) {
    request(url,(er,response,body)=>{
      cb({data:JSON.parse(body)},meta);
    });
  }
}

function get_needed_data_fn(req) {
  return static_url_pool("http://jsonplaceholder.typicode.com/users");
}

router.get("*",(req,res)=>{
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var theme = Theme(req.headers["user-agent"]);
      ((cb)=>{
        var needs_to_pull_data = get_needed_data_fn(req);
        if(needs_to_pull_data) {
          needs_to_pull_data((data,meta)=>{
            cb(data,meta);
          });
        } else {
          cb({},{});
        }
      })((data,meta)=>{
        const content = renderToString(
          <MuiThemeProvider muiTheme={theme}>
            <RouterContext {...renderProps} data={data}/>
          </MuiThemeProvider>
        );
        res.render('index', {
          title: 'Express',
          data: false,
          styles: [
            "//fonts.googleapis.com/css?family=Roboto:300,400,500",
            "//cdnjs.cloudflare.com/ajax/libs/minireset.css/0.0.2/minireset.min.css",
            "/static/css/style.min.css"
          ],
          scripts: [
            '//cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.31/polyfill.js',
            "//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.js",
            "/static/js/bundle.min.js"
          ],
          content,
          data
        });
      })
    } else {
      res.status(404).send('Not Found');
    }
  });
});

module.exports = router;
