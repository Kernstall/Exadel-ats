import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

class CreateSingleWordTest extends React.Component {
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
      testAnswerOptions,
      submitQuestionFormCallback,
      singleWordChangeCallback,
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
        <TextField
          id="task-answer"
          label="Ведите правильный ответ"
          onChange={singleWordChangeCallback}
          className={`${classes.block}`}
          value={testAnswerOptions[0]}
        />
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

export default withStyles(styles)(CreateSingleWordTest);
