import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

const styles = ({
  text: {
    fontSize: '15px',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
});

class AttemptCode extends React.Component {
  render() {
    const { lang, codeString, classes } = this.props;
    return (
      <div className={classes.text}>
        <SyntaxHighlighter language={lang} style={docco}>{codeString}</SyntaxHighlighter>
      </div>
    );
  }
}

AttemptCode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttemptCode);
