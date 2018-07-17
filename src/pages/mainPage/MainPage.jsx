import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { getStudents } from '../../_commands/students';
import LoginForm from '../../common/loginForm/LoginForm.jsx';
import TabComponent from '../../common/tabComponent/TabComponent.jsx';
import TopStudents from '../../common/top/TopStudents.jsx';
import Common from '../../common/Styles/Common';
import Spinner from '../../common/Shared/spinner/index';
import TopTabs from '../../common/topTabs/TopTabs.jsx';
import styles from './styles';

const Tops = [
  {
    TopBy: 'top by Mark',
    Students: [],
  },
  {
    TopBy: 'top by Tasks',
    Students: [],
  },
  {
    TopBy: 'top by Tests',
    Students: [],
  },
  {
    TopBy: 'top by Activity',
    Students: [],
  },
];

class MainPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin, classes.contentDisplay].join(' ')}>
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
