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
    TopBy: 'Top by Mark',
    Students: <TopStudents topScoreStudentName={['asd', 'asd']} />,
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

class MainPage extends React.Component { // ({ classes }) => (
  constructor(props) {
    super(props);
    this.TabHeaders = Tops;
  }

  componentDidMount() {
    this.props.getStudents({ param: 'param for command' }); // eslint-disable-line
  }

  render() {
    const { classes, students, isLoading } = this.props;
    let rotatingSection;

    if (students) {
      this.TabHeaders.length = 0;
      students.forEach(element => this.TabHeaders.push({
        tabName: element.TopBy,
        component: <TopStudents topScoreStudentName={element.Students} />,
      }));
      console.log('MainPage.students ', students);
    } else {
      rotatingSection = (
        <Paper className={[classes.flex, classes.heightToTop].join(' ')}>
          <Spinner />
        </Paper>
      );
    }


    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
        <Grid container direction="column">
          <TabComponent
            tabHeaders={this.TabHeaders}
          />
          {rotatingSection}
        </Grid>
        <LoginForm />
      </div>);
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
