import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { getStudents } from '../../_commands/students';
import LoginForm from '../loginForm/LoginForm';
import TabComponent from '../tabComponent/TabComponent.jsx';
import TopStudents from '../top/TopStudents.jsx';
import Common from '../Styles/Common';
import Spinner from '../Shared/spinner/index';

const styles = ({
  ...Common,
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
  heightToTop: {
    height: '100px',
  },
});

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

class TopTabs extends Component {
  constructor(props) {
    super(props);
    this.TabHeaders = Tops;
  }

  componentDidMount() {
    this.props.getStudents({ param: 'param for command' }); // eslint-disable-line
  }

  render() {
    const { classes, students } = this.props;
    let rotatingSection;
    if (students) {
      this.TabHeaders.length = 0;
      students.forEach(element => this.TabHeaders.push({
        tabName: element.TopBy,
        component: <TopStudents topScoreStudentName={element.Students} />,
      }));
    } else {
      rotatingSection = (
        <Paper className={[classes.flex, classes.heightToTop].join(' ')}>
          <Spinner />
        </Paper>
      );
    }

    return (
      <div>
        <Grid container direction="column">
          <TabComponent
            tabHeaders={this.TabHeaders}
          />
          {rotatingSection}
        </Grid>
      </div>
    );
  }
}

const styledComponent = withStyles(styles)(TopTabs);

const mapStateToProps = state => ({
  isLoading: state.students.isLoading,
  students: state.students.students,
});

const mapCommandsToProps = dispatch => ({
  getStudents: param => dispatch(getStudents(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(styledComponent);
