import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Questions from './Questions';
import Spinner from '../shared/spinner/index';


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const testQuestions = [
  {
    name: 'test1?',
    answers: ['answer1', 'answer2'],
    type: '1',
  },
  {
    name: 'testtest?',
    answers: ['answer1', 'answer2', 'answer3'],
    type: '2',
  },
  {
    name: 'dfghjk?',
    type: '3',
  },
  {
    name: 'tesdfghjklt1?',
    type: '4',
  },
];


class PassingTest extends Component {
  // componentDidMount() {
  //   this.props.getAttemptCode({
  //     taskId: this.props.match.params.taskId,
  //     attemptNumber: this.props.match.params.attemptNumber,
  //   });
  // }


  render() {
    const { classes } = this.props;
    if (testQuestions) {
      return (
        <div className={classes.root}>
          <List
            component="nav"
          >
            {
              testQuestions.map(
                (question, index) => (
                  <Questions
                    question={question}
                    key={index}
                  />
                ),
              )
            }
          </List>
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

// const mapStateToProps = state => ({
//   // isLoading: state.tasksList.isLoading,
//   attemptCode: state.attemptCode.attemptCode,
// });
//
// const mapCommandsToProps = dispatch => ({
//   getAttemptCode: param => dispatch(getAttemptCode(param)),
// });
//
// const styled = withStyles(styles)(passingTest);
//
// export default connect(mapStateToProps, mapCommandsToProps)(styled);
export default withStyles(styles)(PassingTest);
