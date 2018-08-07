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
          margin="normal"
          className={classes.marginDense}
        />
      </form>
    );
  }
}

Type3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Type3);
