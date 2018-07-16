import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  capture: {
    fontSize: '0.8em',
    fontWeight: '100',
    marginTop: '20px',
  },
};

const Capture = ({ children, classes }) => (
  <div className={classes.capture}>
    {children}
  </div>
);

export default withStyles(styles)(Capture);
