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
import StudentTaskDropDown from './StudentTaskDropDown.jsx';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class StudentTasks extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, task } = this.props;
    let status = 'Not passed';
    if (task.isPassed) {
      status = 'Passed';
    }
    return (
      <div className={classes.root}>
        <ListItem open="false" button onClick={this.handleClick}>
          <Grid container>
            <Grid item xs>
              <ListItemText inset primary={task.name} />
            </Grid>
            <Grid item xs>
              <ListItemText inset primary={task.theme} />
            </Grid>
            <Grid item xs="3" zeroMinWidth>
              <Paper className={classes.paper} elevation={1}>
                <Typography noWrap component="p">
                  {status}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <StudentTaskDropDown
                taskInfo={task.description}
                className={this.props.classes.fullWidth}
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
