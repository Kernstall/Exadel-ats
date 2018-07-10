import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../LoginForm/LoginForm';
import TabComponent from '../TabComponent/TabComponent';
import TopStudents from '../Top/TopStudents';
import Common from '../../Styles/Common';

const styles = ({
  tabWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  ...Common,
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

const MainPage = ({ classes }) => (
  <div>
    <div className={classes.flex}>
      <div className={classes.tabWrapper}>
        <TabComponent tabHeaders={[
          {
            tabName: 'Header',
            component: <TopStudents topScoreStudentName={[
              'Sasha',
              'Misha',
              'Bill',
              'Andry',
            ]}
            />,
          },
          {
            tabName: 'Header',
            component: <TopStudents topScoreStudentName={[
              'Sasha',
              'Misha',
              'Bill',
              'Andry',
            ]}
            />,
          },
        ]}
        />
      </div>
      <LoginForm />
    </div>
  </div>
);

export default withStyles(styles)(MainPage);
