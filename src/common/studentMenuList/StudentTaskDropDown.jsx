import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Attempts from './Attempts.jsx';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
  },
  input: {
    display: 'none',
  },
  fullWidth: {
    width: '100%',
  },
});


class StudentTaskDropDown extends React.Component {
  state = { isShowAttempts: false };

  handleShowAttempts = () => {
    this.setState({ isShowAttempts: true });
  };

  render() {
    const { classes, taskInfo } = this.props;

    return (
      <div className={classes.fullWidth}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="headline" component="h3">
            Info
          </Typography>
          <Typography component="p">
            {taskInfo.description}
          </Typography>
          <Button onClick={this.handleShowAttempts} variant="contained" color="primary" className={classes.button}>
            Show attempts
          </Button>
          <Button variant="contained" color="primary" className={classes.button}>
            Upload solution
          </Button>
          {
            (this.state.isShowAttempts && taskInfo.attempts.length > 0)
              && (
              <div className={classes.root}>
                <List
                  component="nav"
                >
                  {
                  taskInfo.attempts.map(
                    (attempt, index) => (
                      <Attempts
                        attempt={attempt}
                        taskId={taskInfo.taskId}
                        key={index}
                      />
                    ),
                  )
                }
                </List>
              </div>
              )
          }
        </Paper>
      </div>
    );
  }
}

StudentTaskDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTaskDropDown);
