import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StudentTaskDropDown from './StudentTaskDropDown.jsx';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    height: '2px',
    maxWidth: '15%',

  },
  green: {
    backgroundColor: '#3AC54A',
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    height: '2px',
    maxWidth: '15%',
  },
  red: {
    backgroundColor: '#c5313b',
    ...theme.mixins.gutters(),
    paddingBottom: theme.spacing.unit * 2,
    height: '2px',
    maxWidth: '15%',
  },
});

class Attempts extends React.Component {
  state = { open: false };


  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const dateToString = (_date) => {
      function addZero(i) {
        if (i < 10) {
          i = `0${i}`;
        }
        return i;
      }
      const date = new Date(Date.parse(_date));
      const parsedTime = `${addZero(date.getDay())}.${addZero(date.getMonth())}.${addZero(date.getFullYear())}`;
      const parsedData = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
      return `${parsedTime} ${parsedData}`;
    };

    const { classes, attempt } = this.props;

    return (
      <div className={classes.root}>
        <ListItem open="false" button onClick={this.handleClick}>
          <Grid container>
            <Grid item xs>
              <ListItemText primary={`${dateToString(attempt.date)}`} />
            </Grid>
            <Grid item xs>
              <ListItemText primary={`№: ${attempt.number}`} />
            </Grid>
            <Grid item xs>
              <Paper className={attempt.isPassed ? classes.green : classes.red}>
                <Typography component="p">
                  {attempt.result}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              code
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }
}

Attempts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Attempts);
