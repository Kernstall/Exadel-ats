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
import { getStudentExamQuestions } from '../../commands/examinationTest';
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

class ExaminationTest extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [
        {
          availableAnswers: [],
          chosenAnswers: undefined,
          id: '',
          description: '',
          kind: '',
          stringAnswer: undefined,

        },
      ],
    };
    this.updateSingleCallback = this.updateSingleCallback.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateMultipleCallback = this.updateMultipleCallback.bind(this);
    this.handleSubmitTest = this.handleSubmitTest.bind(this);
  }

  componentDidMount() {
    this.props.getStudentExamQuestions({
      testId: this.props.match.params.testId,
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
    console.log(this.state.taskList);
    const answersObject = this.state.taskList.map((qst) => {
      return {
        _id: qst.id,
        selectedIndexes: qst.chosenAnswers,
        answer: qst.stringAnswer,
      };
    });
    this.props.studentSubmitTest({
      answersObject,
      testId: this.props.match.params.testId,
      groupId: this.props.match.params.groupId,
    });
  }


  updateSingleCallback(indexInArray, indexInQuestion) {
    const arr = [...this.state.taskList];
    arr[indexInArray].chosenAnswers.push(indexInQuestion);
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

  updateInputCallback(inputValue, indexInArray) {
    const arr = [...this.state.taskList];
    arr[indexInArray].stringAnswer = inputValue;
    console.log(arr[indexInArray].stringAnswer);
    this.setState({
      taskList: arr,
    });
  }

  render() {
    const { classes, questionsList } = this.props;
    if (questionsList) {
      console.log('hi');
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
                console.log(this.state.taskList)}
              {
                this.state.taskList.map(
                  (question, index) => (
                    <Questions
                      updateSingleCallback={indexInQuestion => (this.updateSingleCallback(index, indexInQuestion))}
                      updateMultipleCallback={indexInQuestion => (this.updateMultipleCallback(index, indexInQuestion))}
                      updateInputCallback={inputValue => (this.updateInputCallback(inputValue, index))}
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

ExaminationTest.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  // isLoading: state.tasksList.isLoading,
  questionsList: state.passingTest.questionsList,
});

const mapCommandsToProps = dispatch => ({
  getStudentExamQuestions: param => dispatch(getStudentExamQuestions(param)),
  studentSubmitTest: param => dispatch(studentSubmitTest(param)),
});

const styled = withStyles(styles)(ExaminationTest);

export default connect(mapStateToProps, mapCommandsToProps)(styled);
