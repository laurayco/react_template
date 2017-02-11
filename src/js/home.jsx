import React, {Component} from 'react';
import {Link} from 'react-router';

class Home extends Component {
  render() {
    return (<span>home</span>);
  }
  componentDidMount() {
    if(this.props.set_header_elements) {
      this.props.set_header_elements(<div>This was made from home.</div>);
    }
  }
}

export default Home;
