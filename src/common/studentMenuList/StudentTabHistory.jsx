import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import Spinner from '../shared/spinner/index';
import StudentActivities from './StudentActivities.jsx';
import { getStudentHistory } from '../../commands/studentHistory';


const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class StudentTabHistory extends Component {
  componentDidMount() {
    this.props.getStudentHistory({
      studentId: '5b45b16f75224332745f7595',
      groupId: '5b4625ba877b5e0734c0a5e3',
    });
  }

  render() {
    const { classes, historyList } = this.props;
    if (historyList) {
      return (
        <div className={classes.root}>
          <List
            component="nav"
          >
            {
              historyList.map(
                (activity, index) => (
                  <StudentActivities
                    activity={activity}
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

StudentTabHistory.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // isLoading: state.tasksList.isLoading,
  historyList: state.studentHistory.historyList,
});

const mapCommandsToProps = dispatch => ({
  getStudentHistory: param => dispatch(getStudentHistory(param)),
});

const styled = withStyles(styles)(StudentTabHistory);

export default connect(mapStateToProps, mapCommandsToProps)(styled);
