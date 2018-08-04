import React from 'react';
import PropTypes from 'prop-types';
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
  flexContainerVertical: {
    display: 'flex',
    'flex-direction': 'column',
  },
  label: {
    height: 'fit-content',
  },
  multilineTextArea: {
    width: '500px',
  },
  shortTextField: {
    width: '95px',
  },
  block: {
  },
});

class CreateSingleAnswerTest extends React.Component {
  render() {
    const { classes, trainingTask, trainingCheckboxCallback, dataChangeCallback, testDescription, testComplexity } = this.props;
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
          id="task-complexity"
          label="Сложность"
          type="number"
          className={`${classes.shortTextField} ${classes.block}`}
          onChange={dataChangeCallback('testComplexity')}
          value={testComplexity}
        />
        <Button className={classes.block}>Добавить тест</Button>
      </div>
    );
  }
}

CreateSingleAnswerTest.propTypes = {
  trainingTask: PropTypes.bool.isRequired,
  trainingCheckboxCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(CreateSingleAnswerTest);
