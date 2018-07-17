import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { getStudents } from '../../commands/students';
import LoginForm from '../LoginForm/LoginForm';
import TabComponent from '../TabComponent/TabComponent';
import TopStudents from '../Top/TopStudents';
import Common from '../../Styles/Common';
import Spinner from '../Shared/Spinner';

const styles = ({
  ...Common,
  fullWidth: {
    'min-width': '200px',
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
    tabName: 'Top',
    component: [],
  },
  {
    tabName: 'Another top',
    component: [],
  },
  {
    tabName: '..and another',
    component: [],
  },
  {
    tabName: 'just wait please',
    component: [],
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
    let tabs = <Grid><TabComponent tabHeaders={this.TabHeaders} /></Grid>;
    console.log('this.TabHeaders', this.TabHeaders);
    if (students) {
      this.TabHeaders = Object.keys(students).map(element => ({
        tabName: element,
        component: <TopStudents topScoreStudentName={
          students[element].map(firstSecondName => (`${firstSecondName.firstName} ${firstSecondName.lastName}`))
        }
        />,
      }));
      console.log('this.TabHeaders', this.TabHeaders);
      tabs = <TabComponent tabHeaders={this.TabHeaders} />;
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
          {tabs}
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
