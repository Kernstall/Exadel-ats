import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class Type2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.question.answersVariants.reduce((acc, curr) => {
      Object.defineProperty(acc, curr, {
        value: false,
      });
      return acc;
    }, {});
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, question } = this.props;
    console.log(this.state);
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{question.description}</FormLabel>
          <FormGroup>
            {
              question.answersVariants.map((answer, index) => (
                <FormControlLabel
                  control={(
                    <Checkbox
                      key={index}
                      checked={this.state.ansrws}
                      onChange={this.handleChange(answer)}
                      value={answer}
                    />
                  )}
                  label={answer}
                />
              ))
            }

          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

Type2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Type2);
