import TextField from '@material-ui/core/TextField';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Edit from '@material-ui/icons/Edit';

const styles = theme => ({
  inputOutput: {
    display: 'flex',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    display: 'none',
  },
  bootstrapInput: {
    boxSizing: 'border-box',
    display: 'flex',
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '80%',
    padding: '10px 12px',
    transition: '1s',
    color: 'black',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  testItem: {
    display: 'flex',
    alignItems: 'center',
    width: '50%',
  },
  addButton: {
    margin: '0px 5px',
    color: 'blue',
    cursor: 'pointer',
  },
  bootstrapInputOutput: {
    display: 'flex',
    width: '85%',
  },
  editAndUpload: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
  },
});

class TestField extends React.Component {
  constructor() {
    super();
    this.id = '';
    this.state = {
      isUploaded: false,
    };
  }

  handleClickUpload = () => {
    console.log('fdghdfgdfgdfg');
  };

  render() {
    const { isUploaded } = this.state;
    const { classes, inputText, isNew, id } = this.props;
    const inputId = `add-file-${id}`;
    return (
      <div className={classes.testItem}>
        <TextField
          value={inputText}
          rows={1}
          className={classes.bootstrapInputOutput}
          multiline
          disabled
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.bootstrapInput,
            },
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.bootstrapFormLabel,
          }}
        />
        {isNew && (
          <div className={classes.editAndUpload}>
            <input
              accept="text/plain"
              className={classes.input}
              id={inputId}
              multiple
              type="file"
              onChange={this.props.handleTestsUpload}
            />
            <label htmlFor={inputId}>
              <CloudUploadIcon
                className={classes.addButton}
              />
            </label>
          </div>)}
      </div>
    );
  }
}

export default withStyles(styles)(TestField);
