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
    tabInfo: [],
  },
  {
    tabName: 'History',
    tabInfo: [],
  },

];


class StudentMenuList extends React.Component {
  render() {
    const { classes } = this.props;
    const TabHeaders = [];
    return (
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
            default:
              TabHeaders.push({
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
  }
}

export default withStyles(styles)(StudentMenuList);
