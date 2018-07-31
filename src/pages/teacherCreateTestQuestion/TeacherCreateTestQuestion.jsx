import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel';
import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup';
import Radio from '@material-ui/core/es/Radio/Radio';
import Paper from '@material-ui/core/es/Paper/Paper';

const styles = theme => ({
  outerWrapper: {
    margin: 'auto',
    width: 'fit-content',
    marginTop: '10px',
    marginBottom: '15px',
  },
  flexContainerHorizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexChildHorizontal: {
    width: 'fit-content',
  },
});

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTestType: '',
    };

    this.handleRadioBoxChange = this.handleRadioBoxChange.bind(this);
  }

  handleRadioBoxChange(event) {
    this.setState({
      selectedTestType: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.outerWrapper}>
        <RadioGroup
          aria-label="Тип теста: "
          name="gender2"
          className={classes.flexContainerHorizontal}
          value={this.state.selectedTestType}
          onChange={this.handleRadioBoxChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="Option 1"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="Option 2"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="Option 3"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="Option 4"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
        </RadioGroup>
      </Paper>
    );
  }
}

export default withStyles(styles)(MainPage);
