import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class CreateSingleAnswerTest extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        Hello World 1
      </div>
    );
  }
}

export default withStyles(styles)(CreateSingleAnswerTest);
