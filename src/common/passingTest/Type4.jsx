import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '24px',
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


class Type4 extends React.Component {
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, question } = this.props;

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
          multiline
          rows="4"
          margin="dense"
        />
      </form>
    );
  }
}

Type4.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Type4);
