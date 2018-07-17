import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core/es';
import Paper from '@material-ui/core/Paper';
import Common from '../../../Styles/Common';

const styles = theme => ({
  ...Common,
});

function InsetList(props) {
  const { classes, info } = props;
  console.log('info', info);
  const childComponent = info.studentGroups.map(element => (
    <Paper className={classes.control}>
      <ListItem button>
        <Grid container>
          <Grid item xs={4}>
            <ListItemText inset primary={element.groupName} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText inset primary={`${element.completedTasks}/${element.allTasks} tasks`} />
          </Grid>
          <Grid item xs={4}>
            <ListItemText inset primary={`${element.completedTests}/${element.allTests} tests`} />
          </Grid>
        </Grid>
      </ListItem>
    </Paper>
  ));
  return (
    <div>
      <List component="nav">
        {childComponent}
      </List>
    </div>
  );
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);
