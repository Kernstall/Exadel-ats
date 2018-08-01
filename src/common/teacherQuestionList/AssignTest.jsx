import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Spinner from '../shared/spinner/index';
import Button from '@material-ui/core/Button';
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
    width: '35%',
    minWidth: '300px',
    margin: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginRight: theme.spacing.unit,
    width: '60%',
    margin: 20,
    display: 'flex',
  },
  textFieldTime: {
    marginLeft: theme.spacing.unit,
    width: '40%',
    margin: 20,
    display: 'flex',
  },
  select: {
    width: '80%',
    margin: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  dataContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
  },
});

class AssingTest extends React.Component {
  constructor() {
    super();
    this.state = {
      group: '',
      student: '',
      flag: '',
      count: '',
      error: '',
      datestart: '2018-01-01',
      datedeadline: '',
      timestart: '00:00',
      timedeadline: '23:59',
    };
  }

  componentDidMount() {
  }

  getErrorJSX = (name) => {
    return name ? (<div className="error">Выберите {name}</div>) : '';
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
        start: '',
        deadline: '',
      });
    }
  };

  handleChangeCount = () => (event) => {
    this.setState({
      count: event.target.value,
    });
  }

  isInvalid = (data) => {
    console.log('data:', data);
    return data.toString() === 'Invalid Date' || data === '';
    // return data === 'Invalid Date' || data === '';
  }

  handleClickAdd = (handle) => {
    const {
      flag,
      count,
      datestart,
      datedeadline,
      timestart,
      timedeadline,
    } = this.state;
    if (!flag) {
      this.setState({ error: 'группу или студента' });
      return;
    }
    if (!count) {
      this.setState({ error: 'количество вопросов' });
      return;
    }
    if (this.isInvalid(datedeadline) || this.isInvalid(datestart)) {
      this.setState({ error: 'дату' });
      return;
    }
    let [timeStart, timeDeadline] = [timedeadline, timestart];
    if (this.isInvalid(timeStart)) {
      timeStart = '00:00';
    }
    if (this.isInvalid(timeDeadline)) {
      timeDeadline = '23:59';
    }
    const body = {};
    const [dateStart, dateDeadline] = [new Date(datestart), new Date(datedeadline)];
    body[flag] = this.state[flag];
    body.count = count;
    body.startDate = `${dateStart.getFullYear()}-${dateStart.getMonth()}-${dateStart.getDate()}T${timeStart}`;
    body.finishDate = `${dateDeadline.getFullYear()}-${dateDeadline.getMonth()}-${dateDeadline.getDate()}T${timeDeadline}`;
    console.log(body);
  }

  handleChangeData = (type, name) => {
    console.log(document.getElementById(`${type}-${name}`).value);
    console.log(new Date(document.getElementById(`${type}-${name}`).value));
    this.setState({ [`${type}${name}`]: new Date(document.getElementById(`${type}-${name}`).value), error: '' });
  }

  render() {
    const { classes, handleClose } = this.props;
    const groups = ['Dima2018', 'JAVA EE'];
    const students = ['Anna Sikolo', 'Mark Vindomr'];
    const questionCount = ['10', '15', '20', '25', '30', '35', '40'];
    const errorCode = this.getErrorJSX(this.state.error);
    return (
      <div className={classes.flex}>
        <Paper className={classes.root}>
          <form className={classes.container} noValidate>
            <div className={classes.dataContainer}>
              <TextField
                id="date-start"
                label="Дата старта"
                type="date"
                defaultValue="2018-01-01"
                onChange={() => this.handleChangeData('date', 'start')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time-start"
                label="Время"
                type="time"
                defaultValue="00:00"
                onChange={() => this.handleChangeData('time', 'start')}
                className={classes.textFieldTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
            <div className={classes.dataContainer}>
              <TextField
                id="date-deadline"
                label="Дата дедлайна"
                type="date"
                onChange={() => this.handleChangeData('date', 'deadline')}
                defaultValue="2018-12-30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time-deadline"
                label="Время"
                type="time"
                onChange={() => this.handleChangeData('time', 'deadline')}
                defaultValue="23:59"
                className={classes.textFieldTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
            <FormSelect
              id="count-placeholder"
              label="Количество вопросов"
              value={this.state.count}
              inputProps={{
                university: 'Count',
                id: '0',
              }}
              onChange={this.handleChangeCount()}
              options={questionCount}
              className={classes.select}
            />
            <FormSelect
              id="groups-placeholder"
              label="Группе"
              value={this.state.group}
              inputProps={{
                university: 'Group',
                id: '0',
              }}
              onChange={this.handleChange('group')}
              options={groups}
              className={classes.select}
            />
            <FormSelect
              id="students-placeholder"
              label="Студенту"
              value={this.state.student}
              inputProps={{
                university: 'Student',
                id: '0',
              }}
              onChange={this.handleChange('student')}
              options={students}
              className={classes.select}
            />
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
      </div>
    );
  }
}

AssingTest.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AssingTest);
