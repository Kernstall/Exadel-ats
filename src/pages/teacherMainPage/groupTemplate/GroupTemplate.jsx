import React from 'react';
import Grid from '@material-ui/core/es/Grid/Grid';
import { withRouter } from 'react-router-dom';

class GroupTemplate extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>{this.props.response.groupName}</Grid>
        <Grid item xs={12} sm={6}>Amount of students: {this.props.response.studentCount}</Grid>
      </Grid>
    );
  }
}

export default withRouter(GroupTemplate);
