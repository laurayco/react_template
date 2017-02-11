import React, {Component} from 'react';
import {RouterContext, createRoutes} from 'react-router';
import AppRouter from './js/router.js';
const routes = createRoutes(AppRouter());

class DataProvider extends Component {
  getChildContext() {
    return {data: this.props.data};
  }
  render() {
    return <RouterContext {...this.props}/>;
  }
}

DataProvider.propTypes = {
  data: React.PropTypes.object
};

DataProvider.childContextTypes = {
  data: React.PropTypes.object
};
