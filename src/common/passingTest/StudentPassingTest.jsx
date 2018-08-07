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
  componentDidMount() {
    this.props.getStudentQuestions({
      topicId: this.props.match.params.topicId,
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
                questionsList.map(
                  (question, index) => (
                    <Questions
                      question={question}
                      key={index}
                    />
                  ),
                )
            }
            </List>
            <Button variant="contained" color="primary" className={classes.button}>
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
});

const styled = withStyles(styles)(PassingTest);

export default connect(mapStateToProps, mapCommandsToProps)(styled);
