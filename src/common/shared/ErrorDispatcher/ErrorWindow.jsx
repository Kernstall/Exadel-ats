import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Button from '@material-ui/core/es/Button/Button';
import Paper from '@material-ui/core/es/Paper/Paper';
import Typography from '@material-ui/core/es/Typography/Typography';

const styles = {
  wrapper: {
    position: 'fixed',
    display: 'flex',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    'z-index': 9001,
  },
  box: {
    margin: 'auto',
    minWidth: '220px',
    minHeight: '150px',
    backgroundColor: 'white',
    display: 'flex',
    'align-items': 'center',
    flexDirection: 'column',
    'justify-content': 'space-between',
    maxWidth: 'calc(50% + 110px)',
    overflow: 'hidden',
  },
  button: {
    margin: '1rem',
  },
  typography: {
    margin: '1rem',
  },
};

const ErrorWindow = function (props) {
  const { classes, message, callback } = props;
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.box}>
        <Typography className={classes.typography} align="center" paragraph>
          {message}
        </Typography>
        <Button
          className={classes.button}
          onClick={callback}
        >
          OK
        </Button>
      </Paper>
    </div>
  );
};

ErrorWindow.propTypes = {
  message: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default withStyles(styles)(ErrorWindow);
