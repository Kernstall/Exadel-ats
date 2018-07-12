import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import List from "@material-ui/core/es/List/List";
import GroupTemplate from "./GroupTemplate/GroupTemplate";
import TeacherSelectedGroupComponent from "./TeacherSelectedGroupComponent/TeacherSelectedGroupComponent";

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
});

const response = [
  {
    groupName: 'First Group',
    studentsAmount: 21,
  },
  {
    groupName: 'Second Group',
    studentsAmount: 27,
  },
  {
    groupName: 'Third Group',
    studentsAmount: 18,
  },
];

const TabContainer = (props) => (
    <Typography component="div" >
      {props.children}
    </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class TeacherMainPage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (e, value) => {
    this.setState({ value });
  };

  render() {
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
            <Tab label="Groups"/>
            <Tab label="Tests"/>
            <Tab label="Tasks"/>
          </Tabs>
          {value === 0 &&
          <TabContainer>
            <TeacherSelectedGroupComponent groupName={response[0].groupName}/>
          </TabContainer>}
          {value === 1 && <TabContainer>Tests</TabContainer>}
          {value === 2 && <TabContainer>Tasks</TabContainer>}
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TeacherMainPage);
