import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/es/Checkbox/Checkbox';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import TextField from '@material-ui/core/es/TextField/TextField';

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

class CreateUncheckedWordAnswerTest extends React.Component {
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
      submitQuestionFormCallback,
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

export default withStyles(styles)(CreateUncheckedWordAnswerTest);
