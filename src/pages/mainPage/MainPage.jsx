import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../../common/loginForm/LoginForm.jsx';
import Common from '../../common/styles/Common';
import TopTabs from '../../common/topTabs/TopTabs.jsx';
import {Redirect} from "react-router-dom";

const styles = ({
  ...Common,
  contentDisplay: {
    display: 'flex',
    'flex-wrap': 'wrap-reverse',
    'justify-content': 'center',
  },
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
  topStudentsWrapper: {
    'flex-grow': '1',
    'padding-right': '10px',
  },
  flexElem: {
    'flex-grow': '1',
    'margin-right': '10px',
  },
});

class MainPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin, classes.contentDisplay].join(' ')}>
        <div className={classes.flexElem}>
          <TopTabs />
        </div>
        <LoginForm />
      </div>
    );
  }
}

export default withStyles(styles)(MainPage);
