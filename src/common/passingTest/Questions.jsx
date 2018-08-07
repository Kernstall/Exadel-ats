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
    switch (question.kind) {
      case 'one answer':
        return (
          <Type1 question={question} />
        );
      case 'multiple answers':
        return (
          <Type2 question={question} />
        );
      case 'without answer option':
        return (
          <Type3 question={question} />
        );
      case 'without answer with verification':
        return (
          <Type4 question={question} />
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
