import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Spinner from '../shared/spinner/index';
import TeacherTaskEdit from '../teachetTaskEdit/TeacherTaskEdit';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  taskTitle: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'grey',
    alignItems: 'center',
  },
  score: {
    display: 'flex',
    width: 'auto',
    padding: '4px 11px 4px 9px',
    borderRadius: 5,
    marginLeft: 10,
    fontWeight: 400,
    fontSize: 24,
    backgroundColor: '#E6E6FA',
  },
  button: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
    alignSelf: 'flex-end',
  },
  flex: {
    padding: '20px',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F8F8FF',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flexWrap: 'wrap',
  },
  taskInfo: {
    display: 'flex',
    width: '90%',
    padding: 5,
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 15,
    backgroundColor: '#e9f2f3',
    minWidth: 50,
    textAlign: 'center',
    padding: '5px 7px',
    margin: 5,
  },
  example: {
    margin: '20px 0px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exampleInner: {
    display: 'flex',
    padding: 10,
    width: '45%',
    minWidth: '300px',
    flexDirection: 'column',
  },
  overflowOption: {
    maxHeight: '200px',
    overflow: 'auto',
  },
  mylink: {
    textDecoration: 'none',
    color: 'white',
  },
  inAndOut: {
    fontSize: '23px',
  },
  '@media (max-width: 700px)': {
    flex: {
      width: '85%',
    },
  },
});

class TaskView extends React.Component {
  constructor() {
    super();
    this.id = '';
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    this.id = this.props.match.params.id;
    const text = 'Тот, кто писал эту программу, явно делал это в спешке.. На самом деле, нет: программа-то учебная, и этот кто-то нарочно запихнул туда лишние переменные, а те, что надо, не объявил. Исправляем ситуацию: лишние переменные закомментируем, а недостающие — объявим. И наступит тогда в программе всеобщая гармония.';
    const tags = ['БГУ', 'Последовательность', 'Василенко', 'ФПМИ'];
    const data = '1\n2\n3\n4\n2\n3\n4\n2\n3';
    const taskName = 'Чистка кода';
    const score = 6;
    let a = localStorage.getItem('user');
    a = a.substring(1, a.length - 1);
    const pathBack = `/teacher/id/${a}`;
    const pathEdit = `/teacher/task/${this.id}`;


    return (
      <div className={classes.root}>
        <div className={classes.flex}>
          <div className={classes.taskTitle}>
            <Typography variant="display1">{taskName}</Typography>
            <Typography variant="h3" className={classes.score}>{score}</Typography>
          </div>
          <Typography variant="display1">Условие</Typography>
          <Typography className={classes.taskInfo}>{text}</Typography>
          <div className={classes.example}>
            <div className={classes.exampleInner}>
              <Typography variant="display1" className={classes.inAndOut}>Входные данные</Typography>
              <div className={classes.overflowOption}>
                {data.split('\n').map((element, index) => (<Typography key={index}>{element}</Typography>))}
              </div>
            </div>
            <div className={classes.exampleInner}>
              <Typography variant="display1" className={classes.inAndOut}>Выходные данные</Typography>
              <div className={classes.overflowOption}>
                {data.split('\n').map((element, index) => (<Typography key={index}>{element}</Typography>))}
              </div>
            </div>
          </div>
          <Typography variant="display1">Тэги</Typography>
          <Typography className={classes.tags}>
            {tags.map((element, index) => (<div key={index} className={classes.tag}>{element}</div>))}
          </Typography>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link className={classes.mylink} to={pathEdit}>Редактировать</Link>
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link className={classes.mylink} to={pathBack}>Назад к группе</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

TaskView.propTypes = {
  classes: PropTypes.object.isRequired,
};
TaskView.contextTypes = {
  router: PropTypes.object,
};

export default (withStyles(styles)(TaskView));
