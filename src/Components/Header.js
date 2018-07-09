import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
  header: {
    height: 40,
  },
});

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.header}>
        Logo
    </div>
  );
}

export default withStyles(styles)(Header);
