import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../LoginForm/LoginForm';
import TabComponent from '../TabComponent/TabComponent';
import TopStudents from '../Top/TopStudents';
import Common from '../../Styles/Common';

const styles = ({
  ...Common,
  contentDisplay: {
    display: 'flex',
    'flex-wrap': 'wrap-reverse',
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
    Students: ['Sasha', 'Misha', 'Bill', 'Andry', 'Roma', 'Victor', 'Bill'],
  },
  {
    TopBy: 'Top by Tasks',
    Students: ['1 Sasha', '1 Misha', '1 Bill', '1 Andry'],
  },
  {
    TopBy: 'Top by Tests',
    Students: ['2 Sasha', '2 Misha', '2 Bill', '2 Andry'],
  },
  {
    TopBy: 'Top by Activity',
    Students: ['3 Sasha', '3 Misha', '3 Bill', '3 Andry'],
  },
];

class MainPage extends React.Component { // ({ classes }) => (
  constructor(props) {
    super(props);
    this.TabHeaders = [];
  }

  render() {
    const { classes } = this.props;
    this.TabHeaders.length = 0;
    Tops.forEach(element => this.TabHeaders.push({
      tabName: element.TopBy,
      component: <TopStudents topScoreStudentName={element.Students} />,
    }));
    return (
      <div className={[classes.flex, classes.centerScreen, classes.margin, classes.contentDisplay].join(' ')}>
        <div className={classes.topStudentsWrapper}>
          <TabComponent
            tabHeaders={this.TabHeaders}
          />
        </div>
        <LoginForm />
      </div>);
  }
}

export default withStyles(styles)(MainPage);
