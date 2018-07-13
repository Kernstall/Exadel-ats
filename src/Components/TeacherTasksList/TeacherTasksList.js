import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TaskInTopic from './TaskInTopic';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100px',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
  },
});

const topics = [
  {
    topicName: 'Многопоточность',
    tasks: [
      {
        taskName: 'Сделать клиент-сервер',
        tags: ['БГУ', 'Java'],
      },
      {
        taskName: 'Сортировка сообщений',
        tags: ['БГУИР', 'сортировка'],
      },
      {
        taskName: 'Задача3',
        tags: ['БГУ'],
      },
    ],
  }, {
    topicName: 'Сортировка',
    tasks: [
      {
        taskName: 'Пузырек',
        tags: ['tag1', 'tag2'],
      },
      {
        taskName: 'Шейкерная сортировка',
        tags: ['tag1', 'tag2'],
      },
    ],
  },
];

class TeacherTaskList extends React.Component {

  objtoJSX = (array) => {
    return array.map((element, index) => (
      <TaskInTopic button topicName={element.topicName} tasks={element.tasks} />
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {this.objtoJSX(topics)}
        </List>
      </div>
    );
  }
}

TeacherTaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherTaskList);
