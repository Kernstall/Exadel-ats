import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import Grid from '@material-ui/core/es/Grid/Grid';

class GroupTemplate extends React.Component {
  render() {
    return (
      <ListItem button>
        <Grid container>
          <Grid item xs={12} sm={6}>{this.props.groupName}</Grid>
          <Grid item xs={12} sm={6}>Amount of students: {this.props.studentsAmount}</Grid>
        </Grid>
      </ListItem>
    );
  }
}

export default (GroupTemplate);
