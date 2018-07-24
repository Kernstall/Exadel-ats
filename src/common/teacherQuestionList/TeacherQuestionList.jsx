import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import QuestionTopics from './QuestionTopics';

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
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('/api/teacher/questions', {
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
      <QuestionTopics
        button
        topicName={element.topicName}
        count={element.count}
        questions={element.questions}
        key={index}
      />
    ));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.flex}>
        <List>
          {this.objtoJSX(this.state.data)}
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

export default withStyles(styles)(TeacherTaskList);
