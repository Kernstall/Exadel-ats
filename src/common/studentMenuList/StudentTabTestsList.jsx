import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Spinner from '../shared/spinner/index';
import List from '@material-ui/core/List';
import StudentTests from './StudentTests.jsx';
import { getStudentTests } from '../../commands/studentTests';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class StudentTabTestsList extends React.Component {
  componentDidMount() {
    this.props.getStudentTests({
      studentId: '5b45b16f75224332745f7595',
      groupId: '5b4625ba877b5e0734c0a5e3',
    });
  }

  render() {
    const { classes, testsList } = this.props;
    if (testsList) {
      return (
        <div className={classes.root}>
          <List
            component="nav"
          >
            {
              testsList.map(
                (test, index) => (
                  <StudentTests
                    test={test}
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

StudentTabTestsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // isLoading: state.tasksList.isLoading,
  testsList: state.studentTests.testsList,
});

const mapCommandsToProps = dispatch => ({
  getStudentTests: param => dispatch(getStudentTests(param)),
});

const styled = withStyles(styles)(StudentTabTestsList);

export default connect(mapStateToProps, mapCommandsToProps)(styled);
