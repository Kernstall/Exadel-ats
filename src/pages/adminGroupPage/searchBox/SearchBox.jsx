import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core/es';
import Input from '@material-ui/core/Input';
import localize from '../../../localization/localization';

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
  }

  inputParser = (textToParse) => {
    const result = {
      firstName: '',
      lastName: '',
      fathersName: '',
      groupName: '',
    };
    const words = textToParse.split(' ');
    words.forEach((word, index) => {
      if (word.search(/[A-z]/i) !== -1) {
        result.groupName = word;
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
          {localize('Search groups by:')}
        </div>
        <Paper className={classes.child} elevation={0}>
          <Input
            placeholder="Группа или учитель ..."
            className={classes.input}
            disableUnderline
            onChange={this.handleChange('name')}
          />
        </Paper>
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBox);
