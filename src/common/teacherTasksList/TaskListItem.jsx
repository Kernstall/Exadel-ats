import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import './styles.css'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/es';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
    width: 'auto',
    maxWidth: '10%',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '95%',
  },
  tags: {
    display: 'flex',
    width: '35%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: '10%',
  },
  taskname: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    width: '45%',
    maxWidth: '70%',
    height: '100%',
  },
  score: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
    height: '100%',
  },
  taskinfo: {
    justify: 'center',
    direction: 'row',
  },
});

class TaskListItem extends React.Component {
  state = { checked: false };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  go() { }
  /*
  <div className="taskinfo-first-part">
            <ListItemText className="taskname" primary={this.props.taskName} />
            <ListItemText className="tags"> <span className="tags-span">тэги: {this.props.tags.join(', ')}</span> </ListItemText>
          </div>
          <div className="taskinfo-second-part">
            <ListItemText className="score"> <span className="score-span">оценка: {this.props.score}</span> </ListItemText>
            <Button variant="contained" color="primary" className={classes.button}>
              Подробнее
            </Button>
            <Checkbox
              className="chooseTask"
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value="checked"
              color="primary"
            />
          </div>
  */

  render() {
    const { classes } = this.props;
    return (
      <div className="taskinfo">
        <Paper className={classes.root} elevation={1}>
          <Grid container className={classes.taskinfo}>
            <Typography component="p" className={classes.taskname}>
              {this.props.taskName}
            </Typography>
            <Typography component="p" className={classes.tags}>
              тэги: {this.props.tags.join(', ')}
            </Typography>
            <Typography className={classes.score}>
              оценка: {this.props.score}
            </Typography>
            <Button variant="contained" color="primary" className={classes.button}>
              Подробнее
            </Button>
            <Checkbox
              className={classes.checkbox}
              checked={this.state.checked}
              onChange={this.handleChange('checked')}
              value="checked"
              color="primary"
            />
          </Grid>
        </Paper>
      </div >
    );
  }
}

TaskListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskListItem);
