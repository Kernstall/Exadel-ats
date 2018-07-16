import React from 'react';
import GroupTemplate from '../GroupTemplate/GroupTemplate';
import Typography from "@material-ui/core/es/Typography/Typography";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import StudentTemplate from "../StudentTemplate/StudentTemplate";

class GroupWrapper extends React.Component {
  render() {
    return (
      <div>
        <Typography>{this.props.groupName}</Typography>
        <List>
          {this.props.groupMembers.map( (item, index) => (
            <ListItem key={index}>
              <StudentTemplate
                name={item.name}
                tasksComplete={item.tasksComplete}
                testsComplete={item.testsComplete}
                score={item.score}
              />
            </ListItem>
          ))};
        </List>
      </div>
    );
  }
}

export default GroupWrapper;
