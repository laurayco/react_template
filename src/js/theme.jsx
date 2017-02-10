import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {purple500, purple700, purple100} from "material-ui/styles/colors";

const _palette = {
  palette: {
    primary1Color: purple500,
    primary2Color: purple700,
    primary3Color: purple100
  }
}, _config =  {
  avatar: {
    borderColor: null
  },
  userAgent: "all"
};

function Theme(useragent) {
  var config = {
    avatar: {
      borderColor: null
    },
    userAgent: useragent
  }
  return getMuiTheme(_palette,config);
}

export default Theme;
