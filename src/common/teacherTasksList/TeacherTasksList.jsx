import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import TaskInTopic from './TaskInTopic.jsx';
import Spinner from '../shared/spinner/index';
import { getTeacherTasks } from '../../commands/teacherTasks';

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
});

class TeacherTaskList extends React.Component {
  constructor() {
    super();
    this.Tasks = [];
  }

  componentDidMount() {
    this.props.getTeacherTasks();
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
  };

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
        <Button variant="contained" color="primary" className={classes.button}>
          Назначить
        </Button>
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
