import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import TestField from './TestField';

const styles = {
  test: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    cursor: 'pointer',
    width: '5%',
    display: 'flex',
  },
};

const TestSet = ({ classes, input, output, id, isNew = false, callback, handleClickEdit, handleClickUpload }) => (

  <div className={classes.test}>
    <TestField
      inputText={input}
      isNew={isNew}
      id={`${id}1`}
      handleClickEdit={handleClickEdit}
      handleClickUpload={handleClickUpload}
    />
    <TestField
      inputText={output}
      isNew={isNew}
      id={`${id}2`}
      handleClickEdit={handleClickEdit}
      handleClickUpload={handleClickUpload}
    />
    <Close
      className={classes.deleteButton}
      onClick={() => callback(id)}
    />
  </div>
);

export default withStyles(styles)(TestSet);
