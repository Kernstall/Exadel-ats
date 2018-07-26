import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Spinner from '../shared/spinner/index';
import QuestionTopics from './QuestionTopics';
import { getTeacherQuestions } from '../../commands/teacherQuestions';

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

class TeacherQuestionList extends React.Component {
  constructor() {
    super();
    this.Questions = [];
  }

  componentDidMount() {
    this.props.getTeacherQuestions();
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
    const { classes, teacherQuestions } = this.props;
    let load;
    if (teacherQuestions) {
      this.Questions = this.objtoJSX(teacherQuestions);
    } else {
      load = (<Spinner />);
    }
    return (
      <div className={classes.flex}>
        <List>
          {this.Questions}
          {load}
        </List>
        <Button variant="contained" color="primary" className={classes.button}>
          Назначить
        </Button>
      </div>
    );
  }
}

TeacherQuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  teacherQuestions: state.teacherQuestions.teacherQuestions,
});

const mapCommandsToProps = dispatch => ({
  getTeacherQuestions: param => dispatch(getTeacherQuestions(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(TeacherQuestionList));
