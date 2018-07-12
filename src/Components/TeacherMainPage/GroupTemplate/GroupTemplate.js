import React from 'react';
import { withStyles } from '@material-ui/core/styles';

class GroupTemplate extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.groupName}</div>
        <div>Amount of students: {this.props.studentsAmount}</div>
      </div>
    );
  }
}

export default GroupTemplate;
