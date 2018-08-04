import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Spinner from '../shared/spinner/index';
import QuestionTopics from './QuestionTopics';
import { getTeacherQuestions } from '../../commands/teacherQuestions';
import AssignTest from './AssignTest';

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
    this.state = {
      clickedType: '',
      assign: '',
    };
  }

  componentDidMount() {
    this.props.getTeacherQuestions();
  }

  handleClick = (id) => {
    if (id === this.state.clickedType) {
      this.setState({ clickedType: '', assign: '' });
    } else {
      this.setState({ clickedType: id, assign: '' });
    }
  };

  handleClose = () => {
    this.setState({ assign: '' });
  }

  handleClickAdd = () => {
    const { clickedType } = this.state;
    if (clickedType) {
      const { teacherQuestions } = this.props;
      const questions = teacherQuestions.find(el => el.topicId === clickedType);
      const questionsCount = questions.count;
      this.setState({
        assign: (
          <AssignTest
            handleClose={this.handleClose}
            topicId={clickedType}
            questionsCount={questionsCount}
          />
        ),
      });
    }
  }

  objtoJSX = (array) => {
    return array.map(element => (
      <QuestionTopics
        button
        topicName={element.topicName}
        count={element.count}
        questions={element.questions}
        key={element.topicId}
        topicId={element.topicId}
        handleClick={this.handleClick}
        check={element.topicId === this.state.clickedType ? true : false}
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
        {this.state.assign}
        {teacherQuestions && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClickAdd}
          >
            Назначить
          </Button>)}
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
