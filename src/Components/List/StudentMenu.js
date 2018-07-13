import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TabComponent from '../TabComponent/TabComponent';
import StudentList from './StudentList';
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

];

const TabHeaders = [];

const StudentMenuList = ({ classes }) => (
  <div className={[classes.flex, classes.centerScreen, classes.margin].join(' ')}>
    {
      tasks.forEach(task => TabHeaders.push({
        tabName: task.tabName,
        component: <StudentList tasksList={task.tabInfo} />,
      }))
    }
    <TabComponent
      tabHeaders={TabHeaders}
    />
  </div>
);

export default withStyles(styles)(StudentMenuList);
