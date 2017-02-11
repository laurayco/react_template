import React, {Component} from 'react';

class DataBaseComponent extends Component {
  constructor(props,context) {
    super(props,context);
    this.state = {};
    if(this.context.data) this.state = this.context.data;
    else if(typeof window !== "undefined") {
      if(typeof window.__INITIAL_STATE__ !== "undefined") {
        this.state = window.__INITIAL_STATE__;
      }
    }
  }
}

export default DataBaseComponent;
