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

const graduateYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
  .map(year => ({
    label: year,
    value: year,
  }));
graduateYears.unshift({
  label: 'Любой год окончания',
  value: 'all',
});
const mediumTaskScore = [4, 5, 6, 7, 8, 9, 10]
  .map(mark => ({
    label: mark,
    value: mark,
  }));
mediumTaskScore.unshift({
  label: 'Средняя оценка задачи',
  value: 'all',
});
const mediumTestScore = [4, 5, 6, 7, 8, 9, 10]
  .map(mark => ({
    label: mark,
    value: mark,
  }));
mediumTestScore.unshift({
  label: 'Средняя оценка теста',
  value: 'all',
});
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
      university: 'all',
      graduateYear: 'all',
      mediumTaskScore: 'all',
      mediumTestScore: 'all',
    };
  }

  inputParser = (textToParse) => {
    const result = {
      firstName: '',
      lastName: '',
    };
    const words = textToParse.split(' ');
    words.forEach((word, index) => {
      if (index === 0) {
        result.lastName = word;
      } else if (index === 1) {
        result.firstName = word;
      }
    });
    return result;
  }

  handleChange = input => (event) => {
    let changesState = {};
    if (input === 'name') {
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
    console.log(newState);
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
            placeholder={`${localize('name')} ...`}
            className={classes.input}
            disableUnderline
            onChange={this.handleChange('name')}
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
        <Paper className={classes.child} elevation={0}>
          <TextField
            id="select-university"
            select
            className={classes.textField}
            value={this.state.graduateYear}
            onChange={this.handleChange('graduateYear')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {graduateYears.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
        <Paper className={classes.child} elevation={0}>
          <TextField
            id="select-university"
            select
            className={classes.textField}
            value={this.state.mediumTaskScore}
            onChange={this.handleChange('mediumTaskScore')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {mediumTaskScore.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
        <Paper className={classes.child} elevation={0}>
          <TextField
            id="select-university"
            select
            className={classes.textField}
            value={this.state.mediumTestScore}
            onChange={this.handleChange('mediumTestScore')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {mediumTestScore.map(option => (
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
