import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    userSelect: 'none',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class Type1 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes, question, updateSingleCallback } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{question.description}</FormLabel>
          <RadioGroup
            aria-label={question.description}
            className={classes.group}
            value={question.chosenAnswers[0]}
            onChange={(event) => { return updateSingleCallback(event.target.value); }}
          >
            {
              question.availableAnswers.map((answer, index) => (
                <FormControlLabel key={index} value={`${index}`} control={<Radio color="secondary" />} label={answer} />
              ))
            }
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

Type1.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Type1);
