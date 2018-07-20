import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/es';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '92%',
    margin: 5,
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
    width: '35%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  tagsInner: {
    width: 'auto',
    backgroundColor: '#77f6ff',
    padding: 10,
    borderRadius: 20,
  },
  score: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '5%',
  },
  scoreInner: {
    width: 'auto',
    backgroundColor: 'rgb(14, 247, 130)',
    padding: '5px 12px 5px 10px',
    borderRadius: 5,
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
});

class TaskListItem extends React.Component {
  state = { checked: false };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  go() { }

  render() {
    const {
      classes, taskName, tags, score,
    } = this.props;
    return (
      <div className="taskinfo">
        <Paper className={classes.root} elevation={1}>
          <Grid container className={classes.taskinfo} justify="center" wrap="nowrap">
            <Typography className={classes.taskname}>
              {taskName}
            </Typography>
            <Typography component="p" className={classes.tags}>
              <span className={classes.tagsInner}> {(tags.length === 0)
                ? 'Нет тэгов'
                : ((tags.length > 0 && tags[0].length > 10)
                  ? ('тэги: ' + tags[0])
                  : ((tags.length === 2 && tags[1].length > 10)
                    ? ('тэги: ' + tags[0])
                    : ((tags.length === 2)
                      ? ('тэги: ' + tags[0] + ', ' + tags[1])
                      : ('тэги: ' + tags[0] + ', ' + tags[1] + '..'))))}
              </span>
            </Typography>
            <Typography className={classes.score}>
              <span className={classes.scoreInner}>{score}</span>
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
      </div>
    );
  }
}

TaskListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskListItem);
