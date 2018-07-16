import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../LoginForm/LoginForm';
import Common from '../../Styles/Common';
import TopTabs from '../TopTabs/TopTabs';

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
    'margin-right': '20px',
    'flex-grow': '1',
  },
});

class MainPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin, classes.contentDisplay].join(' ')}>
        <TopTabs />
        <LoginForm />
      </div>
    );
  }
}

export default withStyles(styles)(MainPage);
