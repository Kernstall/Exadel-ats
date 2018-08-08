import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Spinner from '../shared/spinner/index';
import { getTaskInfo } from '../../commands/taskInfo';

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
    color: 'grey',
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
    userSelect: 'none',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e9f2f3',
    minWidth: 50,
    margin: 5,
    fontWeight: 400,
    color: 'grey',
  },
  example: {
    margin: '15px 0px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exampleInner: {
    display: 'flex',
    padding: '10px 10px 10px 0px',
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
    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    this.props.getTaskInfo(this.props.match.params.id);
    this.setState({ id: this.props.match.params.id });
  }

  render() {
    const { classes, taskInfo } = this.props;
    let load;
    console.log(this.state);
    let a = localStorage.getItem('user');
    a = a.substring(1, a.length - 1);
    const pathBack = `/teacher/id/${a}`;
    const pathEdit = `/teacher/task/edit/${this.state.id}`;
    if (taskInfo) {
      load = (
        <div className={classes.flex}>
          <div className={classes.taskTitle}>
            <Typography variant="display1">{taskInfo.name}</Typography>
            <Typography className={classes.score}>{taskInfo.weight}</Typography>
          </div>
          <Typography variant="display1" className={classes.inAndOut}>Условие</Typography>
          <Typography className={classes.taskInfo}>{taskInfo.description}</Typography>
          <div className={classes.example}>
            <div className={classes.exampleInner}>
              <Typography variant="display1" className={classes.inAndOut}>Входные данные</Typography>
              <div className={classes.overflowOption}>
                {taskInfo.input.split('\n').map((element, index) => (<Typography key={index}>{element}</Typography>))}
              </div>
            </div>
            <div className={classes.exampleInner}>
              <Typography variant="display1" className={classes.inAndOut}>Выходные данные</Typography>
              <div className={classes.overflowOption}>
                {taskInfo.output.split('\n').map((element, index) => (<Typography key={index}>{element}</Typography>))}
              </div>
            </div>
          </div>
          <Typography variant="display1" className={classes.inAndOut}>Теги</Typography>
          <div className={classes.tags}>
            {taskInfo.tags.map((element, index) => (
              <Chip key={index} label={element} className={classes.tag} />
            ))}
          </div>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link className={classes.mylink} to={pathEdit}>Редактировать</Link>
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link className={classes.mylink} to={pathBack}>Назад</Link>
            </Button>
          </div>
        </div>
      );
    } else {
      load = (<Spinner />);
    }

    return (
      <div className={classes.root}>
        {load}
      </div>
    );
  }
}

TaskView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  taskInfo: state.taskInfo.taskInfo,
});

const mapCommandsToProps = dispatch => ({
  getTaskInfo: param => dispatch(getTaskInfo(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(TaskView));
