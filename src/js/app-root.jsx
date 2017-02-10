import React, {Component} from 'react';
import {Link} from 'react-router';
import {lightBaseTheme} from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from "./theme.js";

class AppRoot extends Component {
  constructor() {
    super();
    this.state = {
      header_elements: <div/>
    }
  }
  set_header_elements(els) {
    this.setState({
      header_elements: els
    });
  }
  componentWillMount() {
  }
  render() {
    var she = this.set_header_elements.bind(this);
    var kiddos = React.Children.map(this.props.children,function(child){
      return React.cloneElement(child,{
        set_header_elements: she
      });
    });
    return (
        <div>
          <AppBar className="app_bar" title={this.props.title} showMenuIconButton={false}>
            <div id="nested_content">
              {this.state.header_elements}
            </div>
          </AppBar>
          <div>
            {kiddos}
          </div>
        </div>
    );
  }
}

AppRoot.defaultProps = {
  title: "website"
};

export default AppRoot;
