import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core/es';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import localize from '../../../localization/localization';

const kind = [
  'without answer option',
  'without answer with verification',
  'one answer',
  'multiple answers',
].map(element => ({
  label: localize(element),
  value: element,
}));
kind.unshift({
  label: 'Варианты ответа',
  value: 'all',
});

const difficultyRate = [1, 2, 3, 4].map(element => ({
  label: element,
  value: element,
}));
difficultyRate.unshift({
  label: 'Сложность',
  value: 'all',
});

const isTraining = [
  {
    label: 'Тип',
    value: 'all',
  },
  {
    label: 'Тренировочный',
    value: true,
  },
  {
    label: 'Контрольный',
    value: false,
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
      kind: 'all',
      difficultyRate: 'all',
      isTraining: 'all',
    };
  }

  handleChange = input => (event) => {
    const newState = {
      ...this.state,
      [input]: event.target.value,
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
          <TextField
            id="select-university"
            select
            className={classes.textField}
            value={this.state.kind}
            onChange={this.handleChange('kind')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {kind.map(option => (
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
            value={this.state.difficultyRate}
            onChange={this.handleChange('difficultyRate')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {difficultyRate.map(option => (
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
            value={this.state.isTraining}
            onChange={this.handleChange('isTraining')}
            InputProps={{
              disableUnderline: true,
            }}
          >
            {isTraining.map(option => (
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
