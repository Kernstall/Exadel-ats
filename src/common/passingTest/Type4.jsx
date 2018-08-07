import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
        <TextField
          id="full-width"
          label={question.description}
          InputLabelProps={{
            shrink: true,
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
