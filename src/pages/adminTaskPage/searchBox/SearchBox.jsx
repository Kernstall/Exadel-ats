import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core/es';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
      score: 'all',
      language: 'all',
      name: '',
    };
    this.score.unshift({
      value: 'all',
      label: 'Любая сложность ...',
    });
    this.language.unshift({
      value: 'all',
      label: 'Любые языки ...',
    });
  }

  score = [4, 6, 8, 10].map(element => ({
    value: element,
    label: element,
  }));

  language = ['Java', 'C++'].map(element => ({
    value: element,
    label: element,
  }))

  handleChange = input => (event) => {
    const newState = {
      ...this.state,
      [input]: event.target.value,
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
          Search tasks by:
        </div>
        <Paper className={classes.child} elevation={0}>
          <Input
            placeholder="Название задачи ..."
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
            value={this.state.score}
            onChange={this.handleChange('score')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {this.score.map(option => (
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
            value={this.state.language}
            onChange={this.handleChange('language')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {this.language.map(option => (
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
