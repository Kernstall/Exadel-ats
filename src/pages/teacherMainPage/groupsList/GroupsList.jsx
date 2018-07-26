import React from 'react';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import { Link, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GroupTemplate from '../groupTemplate/GroupTemplate.jsx';
import Button from "@material-ui/core/es/Button/Button";
import TeacherAddGroup from "../../../common/teacherAddGroup/TeacherAddGroup";

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
    fetch(`/api/teacher/group?teacherID=${this.props.id}`)
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
            <Link to={`/teacher/groups/${item._id}`} className={classes.noUnderline}>
              <ListItem button>
                <GroupTemplate response={item} />
              </ListItem>
            </Link>
          </div>
        ))}
        <Link className={classes.buttonContainer} to="/teacher/addGroup">
          <Button className={classes.createNewGroupButton} variant="contained">
            Create new group
          </Button>
        </Link>
      </List>
    );
  }
}

export default withStyles(styles)(GroupsList);
