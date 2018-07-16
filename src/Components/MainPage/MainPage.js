import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { getStudents } from '../../commands/students';
import LoginForm from '../LoginForm/LoginForm';
import TabComponent from '../TabComponent/TabComponent';
import TopStudents from '../Top/TopStudents';
import Common from '../../Styles/Common';
import Spinner from '../Shared/Spinner';
import TopTabs from '../TopTabs/TopTabs';

const styles = ({
  ...Common,
  contentDisplay: {
    display: 'flex',
    'flex-wrap': 'wrap-reverse',
    'justify-content': 'center',
  },
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
  topStudentsWrapper: {
    'margin-right': '20px',
    'flex-grow': '1',
  },
});

const Tops = [
  {
    TopBy: 'Top by Mark',
    Students: [],
  },
  {
    TopBy: 'Top by Tasks',
    Students: [],
  },
  {
    TopBy: 'Top by Tests',
    Students: [],
  },
  {
    TopBy: 'Top by Activity',
    Students: [],
  },
];

class MainPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
        <TopTabs />
        <LoginForm />
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(MainPage);

const mapStateToProps = state => ({
  isLoading: state.students.isLoading,
  students: state.students.students,
});

const mapCommandsToProps = dispatch => ({
  getStudents: param => dispatch(getStudents(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(styledComponent);
