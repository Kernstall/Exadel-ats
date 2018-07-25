import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core/es';
import Paper from '@material-ui/core/Paper';
import Common from '../../styles/Common';

const styles = theme => ({
  ...Common,
});

function InsetList(props) {
  const { classes, info } = props;
  const caption = (
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
  );
  const childComponent = info.groups.map(element => (
    <Paper className={classes.control}>
      <ListItem button>
        <Grid container>
          <Grid item xs={4}>
            <Link to="/studentMenu">
              <ListItemText primary={`${element.groupName}`} />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={`${element.teacherFullName}`} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText primary={`${element.studentsCount}`} />
          </Grid>
        </Grid>
      </ListItem>
    </Paper>
  ));
  return (
    <div>
      <List component="nav">
        {caption}
        {childComponent}
      </List>
    </div>
  );
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);
