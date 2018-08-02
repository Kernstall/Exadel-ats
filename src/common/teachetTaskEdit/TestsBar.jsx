import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import Spinner from '../shared/spinner/index';
import TestSet from './TestSet';

const styles = theme => ({
  testsTitle: {
    display: 'flex',
    color: 'grey',
  },
  testsTitleAndAdd: {
    margin: '10px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tests: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  uploadFile: {
    color: 'blue',
    marginLeft: 10,
    fontSize: 28,
    cursor: 'pointer',
  },
  addButton: {
    marginLeft: 5,
    color: 'blue',
    fontSize: 26,
    cursor: 'pointer',
  },
  inputOutputTitle: {
    display: 'flex',
    width: '50%',
  },
  testsInfo: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'space-around',
  },
  bootstrapInputOutput: {
    display: 'flex',
    width: '85%',
  },
});

class TestsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propsTests: props.tests,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      propsTests: props.tests,
    });
  }

  handleClickDeleteTest = (key) => {
    const { propsTests } = this.state;
    const deleteId = propsTests.findIndex(element => element._id === key);
    propsTests.splice(deleteId, 1);
    this.setState({ propsTests });
  };

  render() {
    const { classes, handleClickAddTest } = this.props;
    const { propsTests } = this.state;
    console.log(this.state);
    return (
      <div className={classes.root}>
        <div className={classes.testsTitleAndAdd}>
          <Typography variant="subheading" className={classes.testsTitle}>Тесты</Typography>
          <AddCircle
            className={classes.addButton}
            onClick={handleClickAddTest}
          />
        </div>
        <div className={classes.tests}>
          <div className={classes.testsInfo}>
            <Typography variant="body2" className={classes.inputOutputTitle}>Input</Typography>
            <Typography variant="body2" className={classes.inputOutputTitle}>Output</Typography>
          </div>
          {propsTests.map(element => (
            <TestSet
              handleTestsUpload={this.props.handleTestsUpload}
              input={element.input}
              output={element.output}
              callback={this.handleClickDeleteTest}
              id={element._id}
              key={element._id}
              isNew={element.isNew}
            />
          ))}
        </div>
      </div>
    );
  }
}

TestsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
TestsBar.contextTypes = {
  router: PropTypes.object,
};

export default (withStyles(styles)(TestsBar));
