import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Questions from './Questions';
import Spinner from '../shared/spinner/index';
import Common from '../styles/Common';
import { getStudentQuestions } from '../../commands/passingTest';
import { studentSubmitTest } from '../../commands/studentSubmitTest';


const styles = theme => ({
  ...Common,
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '70%',
    margin: '20px 15%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    maxWidth: '30px',
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
  },
});

class PassingTest extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [
        {
          availableAnswers: ['ответ1', 'ответ2', 'ответ3'],
          chosenAnswers: [],
          id: 'asdf',
          description: 'описание вопроса',
          kind: 'one answer',

        },
      ],
    };
    this.updateSingleCallback = this.updateSingleCallback.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateMultipleCallback = this.updateMultipleCallback.bind(this);
  }

  componentDidMount() {
    this.props.getStudentQuestions({
      topicId: this.props.match.params.topicId,
      callback: this.updateState,
    });
  }

  updateState() {
    const array = this.props.questionsList.map((elem, index) => {
      return {
        availableAnswers: elem.answersVariants,
        chosenAnswers: [],
        id: elem._id,
        description: elem.description,
        kind: elem.kind,
      };
    });
    this.setState({
      taskList: array,
    });
  }


  handleSubmitTest() {
    const studentIdArray = this.selectedStudents.map(element => element._id);
    const groupObject = {
      studentsList: studentIdArray,
      groupName: this.groupName,
    };
    this.props.teacherCreateGroup(groupObject);
  }


  updateSingleCallback(indexInArray, indexInQuestion) {
    const arr = [...this.state.taskList];
    arr[indexInArray].chosenAnswers[0] = indexInQuestion;
    this.setState({
      taskList: arr,
    });
  }

  updateMultipleCallback(indexInArray, indexInQuestion) {
    const arr = [...this.state.taskList];
    const found = arr[indexInArray].chosenAnswers.find(element => element === indexInQuestion);
    const position = arr[indexInArray].chosenAnswers.indexOf(found);
    found === undefined ? arr[indexInArray].chosenAnswers.push(indexInQuestion) : arr[indexInArray].chosenAnswers.splice(position, 1);

    this.setState({
      taskList: arr,
    });
  }

  render() {
    const { classes, questionsList } = this.props;
    if (questionsList) {
      return (
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={3}>
            {/* <Typography variant="headline" component="h4"> */}
            {/* {testTheme} */}
            {/* </Typography> */}
            <List
              component="nav"
            >
              {
                this.state.taskList.map(
                  (question, index) => (
                    <Questions
                      updateSingleCallback={indexInQuestion => (this.updateSingleCallback(index, indexInQuestion))}
                      updateMultipleCallback={indexInQuestion => (this.updateMultipleCallback(index, indexInQuestion))}
                      question={question}
                      key={index}
                    />
                  ),
                )
            }
            </List>
            <Button variant="contained" color="primary" onClick={this.handleSubmitTest} className={classes.button}>
              Готово
            </Button>
          </Paper>
        </div>
      );
    }
    return (
      <Spinner />
    );
  }
}

PassingTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // isLoading: state.tasksList.isLoading,
  questionsList: state.passingTest.questionsList,
});

const mapCommandsToProps = dispatch => ({
  getStudentQuestions: param => dispatch(getStudentQuestions(param)),
  studentSubmitTest: param => dispatch(studentSubmitTest(param)),
});

const styled = withStyles(styles)(PassingTest);

export default connect(mapStateToProps, mapCommandsToProps)(styled);
