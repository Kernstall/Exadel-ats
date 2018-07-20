import React from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Common from '../../../common/styles/Common';

const styles = {
  ...Common,
  fullWidth: {
    width: '100%',
  },
  child: {
    width: '32%',
  },
};

const ActivityListItems = ({ classes, info }) => (
  <div>
    <Paper
      className={classes.control}
      elevation={0}
    >
      <ListItem>
        <Grid container>
          <Grid item xs={4}>
            <ListItemText secondary="Группа" />
          </Grid>
          <Grid item xs={4}>
            <ListItemText secondary="Преподаватель" />
          </Grid>
          <Grid item xs={4}>
            <ListItemText secondary="Студентов всего" />
          </Grid>
        </Grid>
      </ListItem>
    </Paper>
    {info.map(element => (
      <Paper>
        <ListItem button>
          <Grid container className={classes.fullWidth}>
            <Grid item className={classes.child}>
              <ListItemText primary={`${element.name}`} />
            </Grid>
            <Grid item className={classes.child}>
              <ListItemText primary={`${element.role}`} />
            </Grid>
            <Grid item className={classes.child}>
              <ListItemText primary={`${element.activityType}`} />
            </Grid>
          </Grid>
        </ListItem>
      </Paper>
    ))}
  </div>
);

export default withStyles(styles)(ActivityListItems);
