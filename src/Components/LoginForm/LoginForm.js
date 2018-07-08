import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: '20px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  loginButton: {
    width: 200,
    color: '#000',
    backgroundColor: '#ffb300',
  },
});

class LoginForm extends React.Component {
  handleChange = name => event => {
    this.setState()
  };
  render() {
    const { classes } = this.props;
    return(
      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.inputContainer}>
          <Typography variant="headline"  align="inherit">
            Log In
          </Typography>
          <Typography variant="subheading" gutterBottom>
            Not a member yet?<br />
            <Button size="small" className={classes.button}>Sign Up</Button> now.
          </Typography>
          <TextField
              id="name"
              label="Login"
              className={classes.textField}
              onChange={this.handleChange('name')}
              margin="normal"
          />
          <TextField
              id="password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="normal"
          />
          <Button className={classes.loginButton} color="loginButton">
            Login
          </Button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
