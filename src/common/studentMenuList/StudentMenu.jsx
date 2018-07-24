import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TabComponent from '../tabComponent/TabComponent.jsx';
import StudentTabTasksList from './StudentTabTasksList.jsx';
import StudentTabTestsList from './StudentTabTestsList.jsx';
import StudentTabHistory from './StudentTabHistory.jsx';
import Common from '../styles/Common';


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
    tabInfo: [],
  },
  {
    tabName: 'Tests',
    tabInfo: [
      {
        name: 'Training tests',
        result: 'Avr score1',
        info: [{
          theme: 'e1',
          status: 'N',
        }],
      },
      {
        name: 'Examination tests',
        result: 'Avr score2',
        info: [{
          theme: 'theme2',
          status: 'Not passed',
        },
        {
          theme: 'themet hemet heme1',
          status: 'Not passed',
        },
        {
          theme: 'themetheme theme1',
          status: 'Not passed',
        }],
      },
    ],
  },
  {
    tabName: 'History',
    tabInfo: [],
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
              component: <StudentTabHistory historyList={block.tabInfo} />,
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
