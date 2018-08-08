import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GroupTemplate from '../groupTemplate/GroupTemplate.jsx';
import TeacherAddGroup from '../../../common/teacherAddGroup/TeacherAddGroup';

const styles = {
  noUnderline: {
    textDecoration: 'none',
    color: '#000',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 5,
    textDecoration: 'none',
  },
  createNewGroupButton: {
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
    transition: '.3s',
    width: 200,
    color: '#fff',
    backgroundColor: '#2196f3',
  },
};

class GroupsList extends React.Component {
  constructor() {
    super();
    this.state = {
      response: [],
    };
  }

  componentDidMount() {
    fetch('/api/teacher/group', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Set-Cookie': 'true',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then((res) => {
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
            <ListItem button onClick={() => this.props.getGroupId(item._id)}>
              <GroupTemplate response={item} />
            </ListItem>
          </div>
        ))}
        <Link className={classes.buttonContainer} to="/teacher/addGroup">
          <Button className={classes.createNewGroupButton} variant="contained">
            Создать группу
          </Button>
        </Link>
      </List>
    );
  }
}

export default withStyles(styles)(GroupsList);
