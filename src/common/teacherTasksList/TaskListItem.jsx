import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '97%',
    margin: 5,
    padding: '10px 5px 10px 5px !important',
  },
  taskinfo: {
    justify: 'center',
    direction: 'row',
  },
  taskname: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    width: '35%',
    boxSizing: 'border-box',
    maxWidth: '70%',
    fontSize: 17,
    fontWeight: 300,
  },
  tags: {
    display: 'flex',
    width: '30%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    boxSizing: 'border-box',
  },
  tagsInner: {
    width: 'auto',
    padding: 10,
  },
  score: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  scoreInner: {
    width: 'auto',
    padding: '5px 12px 5px 10px',
    borderRadius: 5,
    backgroundColor: '#E6E6FA',
  },
  button: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
    width: 'auto',
    maxWidth: '15%',
    boxSizing: 'border-box',
    height: 35,
  },
  checkbox: {
    width: '5%',
    boxSizing: 'border-box',
  },
  mylink: {
    textDecoration: 'none',
    color: 'white',
  },
});

class TaskListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  getTags = (tags) => {
    let result;
    switch (tags.length) {
      case 0:
        result = 'Нет тегов';
        break;
      case 1:
        result = `Теги: ${tags[0]}`;
        break;
      case 2:
        if (tags[0].length > 15) {
          result = `Теги: ${tags[0]}, ..`;
        } else {
          result = `Теги: ${tags[0]}, ${tags[1]}`;
        }
        break;
      default:
        if (tags[0].length > 15 || tags[1].length > 15) {
          result = `Теги: ${tags[0]}, ..`;
        } else {
          result = `Теги: ${tags[0]}, ${tags[1]}, ..`;
        }
        break;
    }
    return result;
  }

  handleChange = (name, handle, taskId) => (event) => {
    handle(taskId);
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {
      classes, taskName, tags, score, taskId, handleSetTask,
    } = this.props;
    const link = `/teacher/tasks/${taskId}`;
    const tagsText = this.getTags(tags);

    return (
      <div className="taskinfo">
        <Paper className={classes.root} elevation={1}>
          <Grid container className={classes.taskinfo} justify="center" wrap="nowrap">
            <Typography className={classes.taskname}>
              {taskName}
            </Typography>
            <Typography component="p" className={classes.tags}>
              <span className={classes.tagsInner}>{tagsText}</span>
            </Typography>
            <Typography className={classes.score}>
              <span className={classes.scoreInner}>{score}</span>
            </Typography>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link className={classes.mylink} to={link}>Подробнее</Link>
            </Button>
            <Checkbox
              className={classes.checkbox}
              checked={this.state.checked}
              onChange={this.handleChange('checked', handleSetTask, taskId)}
              value="checked"
              color="primary"
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

TaskListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskListItem);
