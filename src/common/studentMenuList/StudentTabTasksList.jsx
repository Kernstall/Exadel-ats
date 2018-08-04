import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Paper } from '@material-ui/core';
import Spinner from '../shared/spinner/index';
import StudentTasks from './StudentTasks.jsx';
import { getStudentTasks } from '../../commands/studentTasks';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class StudentTabTasksList extends Component {
  componentDidMount() {
    this.props.getStudentTasks({
      groupId: '5b4625ba877b5e0734c0a5e3',
    });
  }

  render() {
    const { classes, tasksList } = this.props;
    if (tasksList) {
      return (
        <div className={classes.root}>
          <List
            component="nav"
          >
            {
              tasksList.map(
                (task, index) => (
                  <StudentTasks
                    task={task}
                    key={index}
                  />
                ),
              )
            }
          </List>
        </div>
      );
    }
    return (
      <Paper className={[classes.flex, classes.heightToTop].join(' ')}>
        <Spinner />
      </Paper>
    );
  }
}

StudentTabTasksList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // isLoading: state.tasksList.isLoading,
  tasksList: state.studentTasks.tasksList,
});

const mapCommandsToProps = dispatch => ({
  getStudentTasks: param => dispatch(getStudentTasks(param)),
});

const styled = withStyles(styles)(StudentTabTasksList);

export default connect(mapStateToProps, mapCommandsToProps)(styled);
