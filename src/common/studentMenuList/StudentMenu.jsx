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
    tabName: 'Задачи',
    tabInfo: [],
  },
  {
    tabName: 'Тесты',
    tabInfo: [],
  },
  {
    tabName: 'История',
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
            case 'Задачи':
              TabHeaders.push({
                tabName: block.tabName,
                component: <StudentTabTasksList
                  tasksList={block.tabInfo}
                  groupId={this.props.match.params.groupId}
                />,
              });
              break;
            case 'Тесты':
              TabHeaders.push({
                tabName: block.tabName,
                component: <StudentTabTestsList
                  testsList={block.tabInfo}
                  groupId={this.props.match.params.groupId}
                />,
              });
              break;
            case 'История':
              TabHeaders.push({
                tabName: block.tabName,
                component: <StudentTabHistory
                  historyList={block.tabInfo}
                  groupId={this.props.match.params.groupId}
                />,
              });
              break;
            default:
              TabHeaders.push({
                tabName: block.tabName,
                component: <StudentTabTasksList
                  tasksList={block.tabInfo}
                  groupId={this.props.match.params.groupId}
                />,
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
