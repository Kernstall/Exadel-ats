import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import AddCircle from '@material-ui/icons/AddCircle';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
  flexContainerHorizontal: {
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
  },
  horizontalFlex: {
    display: 'flex',
    'flex-direction': 'row',
    width: '500px',
  },
  flexContainerVertical: {
    display: 'flex',
    'flex-direction': 'column',
    margin: 'auto',
    width: '500px',
  },
  label: {
    height: 'fit-content',
  },
  multilineTextArea: {
    width: '500px',
  },
  shortTextField: {
    width: '100px',
    margin: '0 1rem 1rem 0',
  },
  block: {
    width: '500px',
  },
  button: {
    width: '400px',
  },
  testsTitle: {
    display: 'flex',
    color: 'grey',
  },
  testsTitleAndAdd: {
    margin: '10px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    marginLeft: 5,
    color: 'blue',
    fontSize: 26,
    cursor: 'pointer',
  },
  radioWidth: {
    width: '450px',
  },
  verticalCancel: {
    display: 'flex',
    'flex-direction': 'column',
    width: '50px',
  },
  cancelWidth: {
    width: '45px',
    cursor: 'pointer',
    height: '48px',
  },
  flex: {
    display: 'flex',
  },
});

class CreateSingleAnswerTest extends React.Component {
  constructor() {
    super();
    this.newAnswerName = '';
  }

  handleNewAnswerNameUpdate(event) {
    this.newAnswerName = event.target.value;
  }

  render() {
    const {
      classes, trainingTask, trainingCheckboxCallback,
      dataChangeCallback, testDescription, testComplexity,
      testAnswerOptions, correctAnswer, addTestAnswerCallback, correctAnswerChangeCallback,
      submitQuestionFormCallback,
      deleteTestAnswerCallback,
    } = this.props;
    return (
      <div className={classes.flexContainerVertical}>
        <div className={`${classes.flexContainerHorizontal}`}>
          <Checkbox
            checked={trainingTask}
            onChange={trainingCheckboxCallback}
            value="trainingCheckbox"
          />
          <Typography className={classes.label}>Тренировочный вопрос</Typography>
        </div>
        <TextField
          id="task-description"
          label="Описание вопроса"
          multiline
          rows="6"
          onChange={dataChangeCallback('testDescription')}
          className={`${classes.multilineTextArea} ${classes.block}`}
          value={testDescription}
        />
        <div className={classes.block}>
          <div className={classes.testsTitleAndAdd}>
            <FormControl
              className={classes.horizontalFlex}
            >
              <TextField variant="subheading" className={classes.testsTitle} placeholder="Введите ответ" onChange={event => this.handleNewAnswerNameUpdate(event)} />
              <AddCircle
                className={classes.addButton}
                onClick={() => addTestAnswerCallback(this.newAnswerName)}
              />
            </FormControl>
          </div>
          <div className={classes.flex}>
            <RadioGroup
              onChange={correctAnswerChangeCallback}
              aria-label="Тип теста: "
              name="testOptions"
              value={correctAnswer}
              className={classes.radioWidth}
            >{testAnswerOptions.map((element, index) => (
              <FormControlLabel
                value={`${index}`}
                control={(
                  <Radio color="secondary" />
                )}
                label={element}
                labelPlacement="start"
              />
            ))}
            </RadioGroup>
            <div className={classes.verticalCancel}>
              {testAnswerOptions.map((element, index) => (
                <Close
                  id={index}
                  onClick={deleteTestAnswerCallback}
                  className={classes.cancelWidth}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={`${classes.block} ${classes.flexContainerHorizontal}`}>
          <TextField
            id="task-complexity"
            label="Сложность"
            type="number"
            className={`${classes.shortTextField}`}
            onChange={dataChangeCallback('testComplexity')}
            value={testComplexity}
          />
          <Button className={classes.button} onClick={submitQuestionFormCallback}>Добавить тест</Button>
        </div>
      </div>
    );
  }
}

CreateSingleAnswerTest.propTypes = {
  trainingTask: PropTypes.bool.isRequired,
  trainingCheckboxCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(CreateSingleAnswerTest);
