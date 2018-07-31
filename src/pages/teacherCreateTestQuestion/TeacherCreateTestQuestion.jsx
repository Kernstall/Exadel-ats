import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel';
import RadioGroup from '@material-ui/core/es/RadioGroup/RadioGroup';
import Radio from '@material-ui/core/es/Radio/Radio';
import Paper from '@material-ui/core/es/Paper/Paper';
import CreateSingleAnswerTest from "./CreateSingleAnswerTest";

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
  content: {
    width: '100%',
  },
});

class TeacherCreateTestQuestion extends React.Component {
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
    let renderingComponent;
    switch (this.state.selectedTestType) {
      case '1':
        renderingComponent = (<CreateSingleAnswerTest />);
        break;
      case '2':
        renderingComponent = 'Hello World 2';
        break;
      case '3':
        renderingComponent = 'Hello World 3';
        break;
      case '4':
        renderingComponent = 'Hello World 4';
        break;
      default:
        renderingComponent = null;
    }

    return (
      <Paper className={classes.outerWrapper}>
        <RadioGroup
          aria-label="Тип теста: "
          name="testType"
          className={classes.flexContainerHorizontal}
          value={this.state.selectedTestType}
          onChange={this.handleRadioBoxChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="С выбором одного варианта"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="Со множественным выбором"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="Со словом - ответом"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="С предложением - ответом"
            labelPlacement="start"
            className={classes.flexChildHorizontal}
          />
        </RadioGroup>
        <div className={classes.content}>
          {renderingComponent}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(TeacherCreateTestQuestion);
