import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core/es';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import localize from '../../../localization/localization';

const universities = [
  {
    value: 'all',
    label: 'Любой университет',
  },
  {
    value: 'БГУ',
    label: 'БГУ',
  },
  {
    value: 'БГУИР',
    label: 'БГУИР',
  },
];

const styles = {
  parent: {
    maxWidth: '300px',
    padding: '0px 5px 10px',
    margin: '20px 20px 0 0',
  },
  caption: {
    fontSize: '0.7em',
    padding: '30px 10px 10px 10px',
  },
  child: {
    fontSize: '0.7em',
    marginTop: '5px',
    background: '#1f1f1f10',
    width: '100%',
  },
  input: {
    margin: '0px',
    padding: '10px',
    width: '93%',
  },
  '@media (max-width: 400px)': {
    parent: {
      margin: '10px auto',
      minWidth: '90%',
    },
  },
  textField: {
    width: '94%',
    padding: '10px 30px 10px 10px',
  },
};

class SearchBox extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      fathersName: '',
      email: '',
      university: 'all',
    };
  }

  inputParser = (textToParse) => {
    const result = {
      firstName: '',
      lastName: '',
      fathersName: '',
      email: '',
    };
    const words = textToParse.split(' ');
    words.forEach((word, index, array) => {
      if (word.search(/@/i) !== -1) {
        result.email = word;
      } else if (index === 0) {
        result.lastName = word;
      } else if (index === 1) {
        result.firstName = word;
      } else if (index === 2) {
        result.fathersName = word;
      }
    });
    return result;
  }

  handleChange = input => (event) => {
    let changesState = {};
    if (input === 'emailOrName') {
      changesState = this.inputParser(event.target.value);
    } else {
      changesState = {
        [input]: event.target.value,
      };
    }

    const newState = {
      ...this.state,
      ...changesState,
    };

    this.setState(newState);
    this.props.handleHistoryFilter(newState);
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={[classes.parent].join(' ')}>
        <div className={classes.caption}>
          Search teacher by:
        </div>
        <Paper className={classes.child} elevation={0}>
          <Input
            placeholder={`${localize('nameOrEmail')}`}
            className={classes.input}
            disableUnderline
            onChange={this.handleChange('emailOrName')}
          />
        </Paper>
        <Paper className={classes.child} elevation={0}>
          <TextField
            id="select-university"
            select
            className={classes.textField}
            value={this.state.university}
            onChange={this.handleChange('university')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {universities.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBox);
