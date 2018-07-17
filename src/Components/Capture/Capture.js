import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  capture: {
    fontWeight: '100',
    margin: '20px',
  },
};

const Capture = ({ children, classes }) => (
  <div className={classes.capture}>
    {children}
  </div>
);

export default withStyles(styles)(Capture);
