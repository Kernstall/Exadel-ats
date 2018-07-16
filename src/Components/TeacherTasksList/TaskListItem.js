import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import './styles.css'

const styles = theme => ({

});

class TaskListItem extends React.Component {
  state = { checked: false };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  go(){

  }
  render() {
    return (
      <div className="taskinfo">
        <ListItemText className="taskname" inset primary={this.props.taskName} />
        <ListItemText className="tags"> <span className="tags-span">тэги: {this.props.tags.join(', ')}</span> </ListItemText>
        <ListItemText className="score"> <span className="score-span">оценка: {this.props.score}</span> </ListItemText>
        <ListItemText className="moreButton" onClick={this.go()}> <span className="more-span"> More </span> </ListItemText>
        <Checkbox
          className="chooseTask"
          checked={this.state.checked}
          onChange={this.handleChange('checked')}
          value="checked"
          color="primary"
        />
      </div>
    );
  }
}

TaskListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskListItem);
