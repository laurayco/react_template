import React, {Component} from 'react';
import {Link} from 'react-router';
import DataBaseComponent from "./basedatacomponent.js";
import {List, ListItem} from 'material-ui/List';

class Home extends DataBaseComponent {
  constructor(a,b) {
    super(a,b);
    if(typeof this.state["data"]==="undefined") {
      this.state.data = [];
    }
    console.log(this.state);
  }
  render() {
    return (<List>
      {this.state.data.map(item=>{
        return <ListItem primaryText={item.name} secondaryText={item.email}></ListItem>
      })}
    </List>);
  }
  componentDidMount() {
    if(this.props.set_header_elements) {
      this.props.set_header_elements(<div>This was made from home.</div>);
    }
  }
}

export default Home;
