import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
        <TextField
          id="with-placeholder"
          label={question}
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

Type3.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Type3);
