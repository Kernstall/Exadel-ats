import React from 'react';
import Typography from '@material-ui/core/Typography';

class StudentTemplate extends React.Component {
  render() {
    return (
      <div>
        <Typography>
          {this.props.name}
        </Typography>
        <Typography>
          {this.props.tasksComplete}
        </Typography>
        <Typography>
          {this.props.testsComplete}
        </Typography>
        <Typography>
          {this.props.score}
        </Typography>
      </div>
    );
  }
}

export default StudentTemplate;
