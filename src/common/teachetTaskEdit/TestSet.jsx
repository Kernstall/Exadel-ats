import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import TestField from './TestField';

const styles = {
  deleteButton: {
    cursor: 'pointer',
    width: '5%',
    display: 'flex',
  },
};

class TestSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
    };
  }

  render() {
    const {
      classes,
      input,
      output,
      isNew = false,
      callback,
      handleClickEdit,
      handleClickUpload,
      handleTestsUpload,
    } = this.props;
    return (
      <div className={classes.test}>
        <TestField
          handleTestsUpload={handleTestsUpload}
          inputText={input}
          isNew={isNew}
          id={`${this.state.id}1`}
          handleClickEdit={handleClickEdit}
          handleClickUpload={handleClickUpload}
        />
        <TestField
          inputText={output}
          isNew={isNew}
          id={`${this.state.id}2`}
          handleClickEdit={handleClickEdit}
          handleClickUpload={handleClickUpload}
        />
        <Close
          className={classes.deleteButton}
          onClick={() => callback(this.state.id)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TestSet);
