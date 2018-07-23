import React from 'react';
import { withStyles, Paper } from '@material-ui/core/es';
import Button from '@material-ui/core/Button';
import Common from '../../../common/styles/Common';

const styles = {
  ...Common,
  parent: {
    maxWidth: '300px',
    padding: '0px 5px 10px',
  },
  caption: {
    fontSize: '0.7em',
    padding: '30px 10px 10px 10px',
  },
  child: {
    fontSize: '0.7em',
    marginTop: '5px',
    background: '#1f1f1f10',
    width: '100%',
  },
  input: {
    margin: '0px',
    padding: '10px',
    width: '93%',
  },
  button: {
    'font-family': 'Roboto, Helvetica, Arial, sans-serif',
    'font-weight': '300',
    'justify-content': 'flex-start',
  },
  '@media (max-width: 400px)': {
    parent: {
      margin: '10px auto',
      minWidth: '90%',
    },
  },
};

const Menue = ({ classes }) => (
  <Paper className={[classes.parent].join(' ')}>
    <div className={classes.caption}>
      Go to
    </div>
    <Paper className={classes.child} elevation={0}>
      <Button
        fullWidth
        variant="flat"
        className={classes.button}
      >
        Teachers
      </Button>
    </Paper>
    <Paper className={classes.child} elevation={0}>
      <Button
        fullWidth
        variant="flat"
        className={classes.button}
      >
        Students
      </Button>
    </Paper>
    <Paper className={classes.child} elevation={0}>
      <Button
        fullWidth
        variant="flat"
        className={classes.button}
      >
        Tasks & Tests
      </Button>
    </Paper>
    <Paper className={classes.child} elevation={0}>
      <Button
        fullWidth
        variant="flat"
        className={classes.button}
      >
        Groups
      </Button>
    </Paper>
    <Paper className={classes.child} elevation={0}>
      <Button
        className={classes.button}
        fullWidth
        variant="flat"
      >
        Statistics
      </Button>
    </Paper>
  </Paper>
);


export default withStyles(styles)(Menue);
