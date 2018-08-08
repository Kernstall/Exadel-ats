import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '24px',
    userSelect: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class Type3 extends React.Component {

  handleChange = input => {
    this.setState({
      answer: input.value,
    });
    console.log(this.state);
  };

  render() {
    const { classes, question, updateInputCallback } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <InputLabel>
          {question.description}
        </InputLabel>
        <TextField
          id="full-width"
          InputLabelProps={{
            margin: 'dense',
          }}
          fullWidth
          margin="normal"
          className={classes.marginDense}
          onChange={event => updateInputCallback(event.target.value)}
        />
      </form>
    );
  }
}

Type3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Type3);
