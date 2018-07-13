import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TaskListItem from './TaskListItem';
import './styles.css';

const styles = theme => ({

});

class TaskInTopic extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  objtoJSX = (array) => {
    return array.map((element, index) => (
      <TaskListItem button taskName={element.taskName} tags={element.tags} />
    ));
  }

  render() {

    return (
      <div className="root">
        <ListItem button onClick={this.handleClick}>
          <ListItemText className="topicItemName" inset primary={this.props.topicName} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.objtoJSX(this.props.tasks)}
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