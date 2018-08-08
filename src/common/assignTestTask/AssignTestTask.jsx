import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Spinner from '../shared/spinner/index';
import FormSelect from '../shared/select/index';

const styles = theme => ({
  button: {
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
    display: 'flex',
    margin: 10,
    width: 100,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  root: {
    display: 'flex',
    width: '18%',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: 70,
    right: 15,
  },
  textField: {
    marginRight: theme.spacing.unit,
    width: '90%',
    margin: 20,
    display: 'flex',
  },
  select: {
    width: '80%',
    margin: 10,
    maxHeight: 200,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  error: {
    margin: 2,
    padding: 5,
    border: '1px red solid',
    borderRadius: 5,
  },
});

function getDataTextField(type, label, classname, defaultThing, onChangeThing) {
  return (
    <TextField
      id={`datetime-${type}`}
      label={label}
      type="datetime-local"
      value={defaultThing}
      className={classname}
      onChange={() => onChangeThing(type)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

class AssingTestTask extends React.Component {
  constructor() {
    super();
    this.state = {
      group: '',
      student: '',
      flag: '',
      count: '',
      error: '',
      start: new Date(),
      deadline: new Date(Date.now() + 432e6),
      groups: '',
      students: '',
    };
    this.startDefault;
  }

  componentDidMount() {
    fetch('/api/teacher/group/students', {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(response => response.json())
      .then((body) => {
        this.setState({ groups: body.groups, students: body.students });
      })
      .catch(err => console.log(err));
  }

  getErrorJSX = (name, errorClass) => {
    return name ? (<div className={errorClass}>{name}</div>) : '';
  }

  getInputDate = (plus = 0) => {
    const hoy = new Date();
    let [d, m, h, mi] = [hoy.getDate() + plus, hoy.getMonth(), hoy.getHours(), hoy.getMinutes()];
    const y = hoy.getFullYear();
    if (d < 10) {
      d = `0${d}`;
    }
    if (m + 1 < 10) {
      m = `0${m + 1}`;
    }
    if (h < 10) {
      h = `0${h}`;
    }
    if (mi < 10) {
      mi = `o${mi}`;
    }
    const data = `${y}-${m}-${d}T${h}:${mi}:00`;
    return data;
  }

  isInvalid = (data) => {
    return data.toString() === 'Invalid Date' || data === '';
  }

  handleChange = name => (event) => {
    if (name === 'group') {
      this.setState({
        [name]: event.target.value,
        student: '',
        flag: 'group',
        error: '',
      });
    } else {
      this.setState({
        [name]: event.target.value,
        group: '',
        flag: 'student',
        error: '',
      });
    }
  }

  handleClickAdd = (handle) => {
    const {
      flag,
      count,
      start,
      deadline,
    } = this.state;
    if (!flag) {
      this.setState({ error: 'Выберите группу или студента' });
      return;
    }
    if (this.props.isTest) {
      if (!count) {
        this.setState({ error: 'Выберите количество вопросов' });
        return;
      }
    }
    if (this.isInvalid(deadline) || this.isInvalid(start)) {
      this.setState({ error: 'Выберите правильно дату' });
      return;
    }
    if (start - this.startDefault < 0) {
      this.setState({ error: 'Старт раньше чем сейчас' });
      return;
    }
    if (deadline - start < 0) {
      this.setState({ error: 'Дедлайн раньше старта' });
      return;
    }
    const myBody = {};
    myBody[flag] = this.state[flag];
    if (this.props.isTest) {
      myBody.questionAmount = count;
      myBody.topicId = this.props.topicId;
    } else {
      myBody.tasksIds = this.props.tasksIds;
    }
    myBody.startDate = start;
    myBody.finishDate = deadline;
    const url = (this.props.isTest) ? 'test' : 'task';

    fetch(`/api/teacher/${url}/assignment`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      body: JSON.stringify(myBody),
      credentials: 'include',
    })
      .then(response => response.json())
      .then((body) => {
        handle();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeCountTime = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleChangeData = (type) => {
    this.setState({ [type]: new Date(document.getElementById(`datetime-${type}`).value), error: '' });
  }

  render() {
    const {
      classes, handleClose, questionsCount, isTest,
    } = this.props;
    const { groups, students, error } = this.state;
    let count = questionsCount;
    if (!isTest) {
      count = 0;
    }
    const questionCount = ['10', '15', '20', '25', '30', '35', '40'].filter(el => parseInt(el, 10) <= count);
    // const time = ['10', '15', '20', '25', '30', '40', '50', '60'];
    const errorCode = this.getErrorJSX(error, classes.error);
    const dvs = this.getInputDate();
    const dvd = this.getInputDate(5);
    this.startDefault = new Date(dvs);

    return (
      <div className={classes.flex}>
        {groups && (
          <Paper className={classes.root}>
            <form className={classes.container} noValidate>
              {getDataTextField('start', 'Дата и время старта', classes.textField, dvs, this.handleChangeData)}
              {getDataTextField('deadline', 'Дата и время дедлайна', classes.textField, dvd, this.handleChangeData)}
              {isTest && (
                <FormSelect
                  id="count-placeholder"
                  label="Количество вопросов"
                  value={this.state.count}
                  inputProps={{
                    university: 'Count',
                    id: '0',
                  }}
                  onChange={this.handleChangeCountTime('count')}
                  options={questionCount}
                  className={classes.select}
                />)}
              <TextField
                id="groups-placeholder"
                select
                label="Группе"
                value={this.state.group}
                inputProps={{
                  university: 'Group',
                  id: '0',
                }}
                onChange={this.handleChange('group')}
                className={classes.select}
              >
                {groups.map(option => (
                  <MenuItem key={option.groupId} value={option.groupId}>
                    {option.groupName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="students-placeholder"
                select
                label="Студенту"
                value={this.state.student}
                inputProps={{
                  university: 'Student',
                  id: '1',
                }}
                onChange={this.handleChange('student')}
                className={classes.select}
              >
                {students.map(option => (
                  <MenuItem key={option.studentInfo} value={option.studentInfo}>
                    {option.studentName}
                  </MenuItem>
                ))}
              </TextField>
            </form>
            {errorCode}
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.handleClickAdd(handleClose)}
              >
                Готово!
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClose}
              >
                Отмена
              </Button>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

AssingTestTask.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AssingTestTask);
