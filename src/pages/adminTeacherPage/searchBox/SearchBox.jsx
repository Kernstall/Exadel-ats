import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core/es';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const universities = [
  {
    value: 'all',
    label: 'Любой университет',
  },
  {
    value: 'BSU',
    label: 'БГУ',
  },
  {
    value: 'BSUIR',
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
      name: '',
      email: '',
      university: 'all',
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
    this.state[name] = event.target.value;
    this.props.handleHistoryFilter(this.state.name, this.state.university, this.state.activityType);
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
            placeholder="Имя или почта ..."
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
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBox);
