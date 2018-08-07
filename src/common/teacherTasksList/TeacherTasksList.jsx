import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TaskInTopic from './TaskInTopic.jsx';
import Spinner from '../shared/spinner/index';
import { getTeacherTasks } from '../../commands/teacherTasks';
import AssignTestTask from '../assignTestTask/AssignTestTask';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
    alignSelf: 'flex-end',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

class TeacherTaskList extends React.Component {
  constructor() {
    super();
    this.Tasks = [];
    this.state = {
      tasksId: [],
      assign: '',
    };
  }

  componentDidMount() {
    this.props.getTeacherTasks();
  }

  objtoJSX = (array) => {
    return array.map(element => (
      <TaskInTopic
        button
        topicName={element.topicName}
        tasks={element.tasks}
        key={element.topicId}
        handleSetTask={this.handleSetTask}
        handleClose={this.handleClose}
        handleDelete={this.handleDelete}
      />
    ));
  };

  handleSetTask = (taskId) => {
    const { tasksId } = this.state;
    const index = tasksId.indexOf(taskId);
    if (index === -1) {
      tasksId.push(taskId);
      this.setState({ tasksId, assign: '' });
      return;
    }
    tasksId.splice(index, 1);
    this.setState({ tasksId, assign: '' });
  }

  isInvalid = (data) => {
    return data.toString() === 'Invalid Date' || data === '';
  }

  handleClose = () => {
    this.setState({ assign: '' });
  }

  handleDelete = (tasks) => {
    const ids = tasks.map(el => el.taskId);
    let { tasksId } = this.state;
    tasksId = tasksId.filter(el => !ids.includes(el));
    this.setState({ tasksId });
  }

  handleClick = () => {
    const { tasksId } = this.state;
    if (tasksId.length > 0) {
      this.setState({
        assign: (<AssignTestTask
          handleClose={this.handleClose}
          tasksIds={tasksId}
          isTest={false}
        />),
      });
    }
  }

  render() {
    const { classes, teacherTasks } = this.props;
    let load;
    if (teacherTasks) {
      this.Tasks = this.objtoJSX(teacherTasks);
    } else {
      load = (<Spinner />);
    }
    return (
      <div className={classes.flex}>
        <List>
          {this.Tasks}
          {load}
        </List>
        {this.state.assign}
        {teacherTasks && (
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              className={classes.button}
            >
              Назначить
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleClickAdd}
            >
              Создать задачу
            </Button>
          </div>
        )}
      </div>
    );
  }
}

TeacherTaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  teacherTasks: state.teacherTasks.teacherTasks,
});

const mapCommandsToProps = dispatch => ({
  getTeacherTasks: param => dispatch(getTeacherTasks(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(TeacherTaskList));
