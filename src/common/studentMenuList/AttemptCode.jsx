import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  width: {
    width: '100%',
  },
});

class AttemptCode extends React.Component {
  render() {
    const { classes, codeString } = this.props;
    return (
      <SyntaxHighlighter language="javascript" style={docco}>{codeString}</SyntaxHighlighter>
    );
  }
}

AttemptCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttemptCode);
