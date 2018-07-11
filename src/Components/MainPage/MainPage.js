import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../LoginForm/LoginForm';
import TabComponent from '../TabComponent/TabComponent';
import TopStudents from '../Top/TopStudents';
import Common from '../../Styles/Common';

const styles = ({
  ...Common,
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
});

const Tops = [
  {
    TopBy: 'Score',
    Students: ['Sasha', 'Misha', 'Bill', 'Andry'],
  },
  {
    TopBy: 'Tasks',
    Students: ['Another Sasha', 'Another Misha', 'Another Bill', 'Another Andry'],
  },
];

const TabHeaders = [];

const MainPage = ({ classes }) => (
  <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
    {
      Tops.forEach(element => TabHeaders.push({
        tabName: element.TopBy,
        component: <TopStudents topScoreStudentName={element.Students} />,
      }))
    }
    <TabComponent
      tabHeaders={TabHeaders}
    />
    <LoginForm />
  </div>
);

export default withStyles(styles)(MainPage);
