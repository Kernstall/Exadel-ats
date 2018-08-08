import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

class GroupTemplate extends React.Component {
  constructor() {
    super();
    this.state = {
      groupId: '',
    };
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>{this.props.response.groupName}</Grid>
        <Grid item xs={12} sm={6}>Количество студентов: {this.props.response.studentCount}</Grid>
      </Grid>
    );
  }
}

export default withRouter(GroupTemplate);
