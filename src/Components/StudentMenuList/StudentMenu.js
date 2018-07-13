import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TabComponent from '../TabComponent/TabComponent';
import StudentList from './StudentTabTasksList';
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

const tasks = [
  {
    tabName: 'Tasks',
    tabInfo: [
      {
        name: 'name1', theme: 'theme1', status: 'status1', info: 'info1',
      },
      {
        name: 'name2', theme: 'theme2', status: 'status2', info: 'info2',
      },
      {
        name: 'name3', theme: 'theme3', status: 'status3', info: 'info3',
      },
    ],
  },
  {
    tabName: 'Tests',
    tabInfo: [
      {
        name: 'Training tests', result: 'Avr score1', info: 'info1',
      },
      {
        name: 'Examination tests', result: 'Avr score2', info: 'info2',
      },
    ],
  },
  {
    tabName: 'History',
    tabInfo: [
      {
        date: 'date1', activity: 'Test test1 passed', score: 'score 10/10',
      },
      {
        date: 'date2', activity: 'Test test2 passed', score: 'score 10/10',
      },
      {
        date: 'date3', activity: 'Test test3 passed', score: 'score 10/10',
      },
    ],
  },

];

const TabHeaders = [];

const StudentMenuList = ({ classes }) => (
  <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
    {

      tasks.forEach((task) => {
        switch (task.tabName) {
          case 'Tasks':
            TabHeaders.push({
              tabName: task.tabName,
              component: <StudentList tasksList={task.tabInfo} />,
            });
            break;
          case 'Tests':
            TabHeaders.push({
              tabName: task.tabName,
              component: <StudentList tasksList={task.tabInfo} />,
            });
            break;
          case 'History':
            TabHeaders.push({
              tabName: task.tabName,
              component: <StudentList tasksList={task.tabInfo} />,
            });
            break;
          default: TabHeaders.push({
            tabName: task.tabName,
            component: <StudentList tasksList={task.tabInfo} />,
          });
        }
      })
    }
    <TabComponent
      tabHeaders={TabHeaders}
    />
  </div>
);

export default withStyles(styles)(StudentMenuList);
