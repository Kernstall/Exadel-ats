import React from 'react';
import Typography from '@material-ui/core/es/Typography/Typography';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import StudentTemplate from '../StudentTemplate/StudentTemplate';

const groupMembers = [
  {
    name: 'Bob Marley',
    testsComplete: 3,
    tasksComplete: 5,
    score: 8.4,
  },
  {
    name: 'Aliaxei Dziadziuk',
    testsComplete: 3,
    tasksComplete: 5,
    score: 8.4,
  },
  {
    name: 'Maksim Anikeyeu',
    testsComplete: 3,
    tasksComplete: 5,
    score: 8.4,
  },
];

class TeacherSelectedGroupComponent extends React.Component {
  render() {
    return (
      <div>
        <Typography align="center">
          {`${this.props.groupName} ${groupMembers.length} students`}
        </Typography>
        <List>
          {groupMembers.map(item => (
            <ListItem button>
              <StudentTemplate
                name={item.name}
                tasksComplete={item.tasksComplete}
                testsComplete={item.testsComplete}
                score={item.score}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default TeacherSelectedGroupComponent;
