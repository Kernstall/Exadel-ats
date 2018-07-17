import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TaskInTopic from './TaskInTopic';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({

});

class TeacherTaskList extends React.Component {
  state = {
    data: []
  }
  componentDidMount() {
    fetch('api/teacher/tasks', {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        this.setState({ data });
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }
  objtoJSX = (array) => {
    return array.map((element, index) => (
      <TaskInTopic
        button
        topicName={element.topicName}
        tasks={element.tasks}
        key={index}
      />
    ));
  }

  render() {
    return (
      <div className="teacher-tasks">
        <List>
          {this.objtoJSX(this.state.data)}
        </List>
        <Button variant="contained" color="primary" className="set-tasks-button">
          Назначить
        </Button>
      </div>
    );
  }
}

TeacherTaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherTaskList);
