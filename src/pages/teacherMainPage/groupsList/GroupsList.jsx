import React from 'react';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import { Link, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GroupTemplate from '../groupTemplate/GroupTemplate.jsx';

const styles = {
  noUnderline: {
    textDecoration: 'none',
    color: '#000',
  },
};

const response = [
  {
    groupId: 1,
    groupName: 'First Group',
    studentsAmount: 21,
    groupMembers: [
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
    ],
  },
  {
    groupId: 2,
    groupName: 'Second Group',
    studentsAmount: 27,
    groupMembers: [
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
    ],
  },
  {
    groupId: 3,
    groupName: 'Third Group',
    studentsAmount: 18,
    groupMembers: [
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
    ],
  },
];

class GroupsList extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
    };
  }

  componentDidMount() {
    fetch('/api/teacher/group?teacherID=5b451cf8ea26655734a039cc')
      .then(res => res.json())
      .then(res => {
        this.setState({
          response: res,
        });
        return res;
      })
      .then(console.log);
  }

  render() {
    const { classes } = this.props;
    return (
      <List>
        {this.state.response.map((item, index) => (
          <div key={`group${index}`}>
            <Link to={`/teacher/${item._id}`} className={classes.noUnderline}>
              <ListItem button>
                <GroupTemplate response={item} />
              </ListItem>
            </Link>
          </div>
        ))}
      </List>
    );
  }
}

export default withStyles(styles)(GroupsList);
