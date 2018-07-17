import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TabComponent from '../../common/tabComponent/TabComponent.jsx';
import StudentTabTasksList from './StudentTabTasksList.jsx';
import StudentTabTestsList from './StudentTabTestsList.jsx';
import StudentTabHistory from './StudentTabHistory.jsx';
import Common from '../../common/Styles/Common';


const styles = ({
  ...Common,
  fullWidth: {
    width: '100%',
  },
  margin: {
    margin: '20px auto',
  },
});

const blocks = [
  {
    tabName: 'Tasks',
    tabInfo: [
      {
        name: 'name1', theme: 'theme1', status: 'status1', info: 'Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna' +
      ' aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ' +
      'ex ea commodo consequat. Duis aute irure ',
      },
      {
        name: 'name2', theme: 'theme2', status: 'status2', info: 'Duis aute irure dolor in reprehenderit ' +
      'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat ' +
      'non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
      },
      {
        name: 'name3', theme: 'theme3', status: 'status3', info: 'Duis aute irure dolor in reprehenderit ' +
      'in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non' +
      ' proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
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
        date: 'date1', name: 'Test test1 passed', score: 'score 10/10',
      },
      {
        date: 'date2', name: 'Test test2 passed', score: 'score 10/10',
      },
      {
        date: 'date3', name: 'Test test3 passed', score: 'score 10/10',
      },
    ],
  },

];

const TabHeaders = [];

const StudentMenuList = ({ classes }) => (
  <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
    {

      blocks.forEach((block) => {
        switch (block.tabName) {
          case 'Tasks':
            TabHeaders.push({
              tabName: block.tabName,
              component: <StudentTabTasksList tasksList={block.tabInfo} />,
            });
            break;
          case 'Tests':
            TabHeaders.push({
              tabName: block.tabName,
              component: <StudentTabTestsList testsList={block.tabInfo} />,
            });
            break;
          case 'History':
            TabHeaders.push({
              tabName: block.tabName,
              component: <StudentTabHistory activitiesList={block.tabInfo} />,
            });
            break;
          default: TabHeaders.push({
            tabName: block.tabName,
            component: <StudentTabTasksList tasksList={block.tabInfo} />,
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
