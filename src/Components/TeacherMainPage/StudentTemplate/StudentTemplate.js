import React from 'react';
import Grid from '@material-ui/core/es/Grid/Grid';

class StudentTemplate extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={6} sm={3}>
          {this.props.name}
        </Grid>
        <Grid item xs={6} sm={3}>
          {`Tasks complete: ${this.props.tasksComplete}`}
        </Grid>
        <Grid item xs={6} sm={3}>
          {`Tests complete: ${this.props.testsComplete}`}
        </Grid>
        <Grid item xs={6} sm={3}>
          {`Score: ${this.props.score}`}
        </Grid>
      </Grid>
    );
  }
}

export default StudentTemplate;
