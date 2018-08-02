import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Type1 from './Type1';
import Type2 from './Type2';
import Type3 from './Type3';
import Type4 from './Type4';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class Questions extends Component {
  render() {
    const { classes, question } = this.props;
    switch (question.type) {
      case '1':
        return (
          <Type1 question={question} />
        );
      case '2':
        return (
          <Type2 name={question.name} answers={question.answers} />
        );
      case '3':
        return (
          <Type3 question={question.name} />
        );
      case '4':
        return (
          <Type4 question={question.name} />
        );
      default:
        return null;
    }
  }
}

Questions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Questions);
