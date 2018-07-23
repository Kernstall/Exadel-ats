import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TaskListItem from './TaskListItem.jsx';

const styles = theme => ({
  topicItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingRight: 10,
    userSelect: 'none',
  },
  topicName: {
    display: 'flex',
    fontSize: 18,
    fontWeight: 300,
  },
  topicCount: {
    display: 'flex',
    fontSize: 17,
    padding: 7,
  },
});

class TaskInTopic extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  objtoJSX = array => (
    array.map((element, index) => (
      <TaskListItem button taskName={element.taskName} tags={element.tags} score={element.score} />
    ))
  );

  render() {
    const { classes, topicName, tasks } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClick}>
          <Grid className={classes.topicItem}>
            <div className={classes.topicName}>{topicName}</div>
            <div className={classes.topicCount}>задач: {tasks.length}</div>
          </Grid>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.objtoJSX(tasks)}
          </List>
        </Collapse>
      </div>
    );
  }
}

TaskInTopic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskInTopic);
