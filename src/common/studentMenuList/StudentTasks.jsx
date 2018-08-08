import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StudentTaskDropDown from './StudentTaskDropDown.jsx';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    height: '2px',
    maxWidth: '15%',

  },
  green: {
    backgroundColor: '#3AC54A',
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    height: '2px',
    maxWidth: '15%',
  },
  red: {
    backgroundColor: '#c5313b',
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    height: '2px',
    maxWidth: '15%',
  },
});

class StudentTasks extends React.Component {
  state = { open: false };


  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handlerUploadAttempts = () => {
    this.props.handlerUploadAttempts();
  }

  render() {
    const { classes, task, index } = this.props;

    return (
      <div className={classes.root}>
        <ListItem open="false" button onClick={this.handleClick}>
          <Grid container>
            <Grid item xs>
              <ListItemText primary={task.name} />
            </Grid>
            <Grid item xs>
              <ListItemText primary={task.theme} />
            </Grid>
            <Grid item xs>
              <Paper className={task.isPassed ? classes.green : classes.red}>
                <Typography component="p">
                  {task.bestResult}/{task.weight}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <StudentTaskDropDown
                taskInfo={task}
                className={this.props.classes.fullWidth}
                handlerUploadAttempts={this.handlerUploadAttempts}
                index={index}
              />
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }
}

StudentTasks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTasks);
