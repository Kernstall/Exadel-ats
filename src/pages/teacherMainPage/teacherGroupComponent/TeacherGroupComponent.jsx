import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/es/Button/Button';
import TeacherSelectedGroupComponent from '../teacherSelectedGroupComponent/TeacherSelectedGroupComponent.jsx';
import {Link} from "react-router-dom";

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

const styles = theme => ({
  root: {
    margin: 'auto',
    color: 'whitesmoke',
    height: 'fit-content',
    backgroundColor: theme.palette.background.paper,
    width: 700,
  },
  groupTemplate: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
  noUnderline: {
    textDecoration: 'none',
    color: '#000',
  },
});

const TabContainer = props => (
  <Typography component="div">
    {props.children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class TeacherGroupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (e, value) => {
    this.setState({ value });
  };

  render() {
    const { groupName, groupMembers } = response.find(item => item.groupId === +this.props.match.params.id);
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            centered
          >
            <Link className={classes.noUnderline} to="/teacher">
              <Tab label="Groups" />
            </Link>
            <Tab label="Tests" />
            <Tab label="Tasks" />
          </Tabs>
          {value === 0
          && <TabContainer>
            {console.log(this.props.match.params)}
              <TeacherSelectedGroupComponent
                groupName={groupName}
                groupMembers={groupMembers}
              />
            </TabContainer>
          }
          {value === 1 && <TabContainer>Tests</TabContainer>}
          {value === 2 && <TabContainer>Tasks</TabContainer>}
        </AppBar>
        <Button className={classes.createNewGroupButton} variant="contained">
          Create new group
        </Button>
      </div>
    );
  }
}

TeacherGroupComponent.propTypes = {
  groupMembers: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default withStyles(styles)(TeacherGroupComponent);
