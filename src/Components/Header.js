import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../Styles/Common';

const styles = ({
  header: {
    height: '200px',
    background: '#2196f3',
  },
  ...sharedStyles,
});

function Header(props) {
  const { classes } = props;
  return (
    <div className={[classes.header, classes.flex].join(' ')}>
      <div className={classes.center}>
        Logo
      </div>
    </div>
  );
}

export default withStyles(styles)(Header);
