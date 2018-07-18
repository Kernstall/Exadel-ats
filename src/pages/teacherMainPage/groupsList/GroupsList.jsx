import React from 'react';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import { Link, Route } from 'react-router-dom';
import GroupTemplate from '../groupTemplate/GroupTemplate.jsx';

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

const RouteWithProps = ({ path, exact, strict, component: Component, location, ...rest}) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    render={(props) => <Component {...props} {...rest} />}
  />
);

class GroupsList extends React.Component {
  render() {
    return (
      <List>
        {response.map((item, index) => (
          <div key={index}>
            {console.log(this.props)}
            <Link to={`/groups/${item.groupId}`}>
              <ListItem button onClick={() => {this.props.callback(item.groupId)}}>
                <GroupTemplate response={item} />
              </ListItem>
            </Link>
          </div>
        ))}
      </List>
    );
  }
}

export default GroupsList;
