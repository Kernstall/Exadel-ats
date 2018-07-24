import React from 'react';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Common from '../../../common/styles/Common';
import localize from '../../../localization/localization';
import cutAfterNSymbols from '../../../util';

const styles = {
  ...Common,
  fullWidth: {
    width: '100%',
  },
  child: {
    width: '24%',
  },
};

const ActivityListItems = ({ classes, info }) => {
  const dateToString = (_date) => {
    const date = new Date(Date.parse(_date));
    const parsedTime = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
    const parsedData = `${date.getHours()}:${date.getMinutes()}`;
    return `${parsedTime} ${parsedData}`;
  };

  return (
    <div>
      <Paper
        className={classes.control}
        elevation={0}
      >
        <ListItem>
          <Grid container>
            <Grid item xs={3}>
              <ListItemText secondary="Имя" />
            </Grid>
            <Grid item xs={3}>
              <ListItemText secondary="Время" />
            </Grid>
            <Grid item xs={3}>
              <ListItemText secondary="Роль" />
            </Grid>
            <Grid item xs={3}>
              <ListItemText secondary="Тип активности" />
            </Grid>
          </Grid>
        </ListItem>
      </Paper>
      {info.map(element => (
        <Paper>
          <ListItem button>
            <Grid container className={classes.fullWidth}>
              <Grid item className={classes.child}>
                <ListItemText primary={`${localize(element.name)}`} />
              </Grid>
              <Grid item className={classes.child}>
                <ListItemText primary={`${dateToString(element.date)}`} />
              </Grid>
              <Grid item className={classes.child}>
                <ListItemText primary={`${localize(element.userType)}`} />
              </Grid>
              <Grid item className={classes.child}>
                <ListItemText primary={`${localize(element.type)}`} />
              </Grid>
            </Grid>
          </ListItem>
        </Paper>
      ))}
    </div>
  );
};

export default withStyles(styles)(ActivityListItems);
