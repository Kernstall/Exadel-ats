import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/es/Button/Button';
import GroupsList from './groupsList/GroupsList.jsx';
import TeacherTasksList from '../../common/teacherTasksList/TeacherTasksList';
import TeacherQuestionList from '../../common/teacherQuestionList/TeacherQuestionList';

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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 5,
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
});

const TabContainer = props => (
  <Typography component="div">
    {props.children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class TeacherMainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }

  handleChange = (e, value) => {
    this.setState({ value });
  };

  _logout = () => {
    localStorage.removeItem('user');
    this.props.history.push('/');
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log(this.props.match.params.id);
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            centered
          >
            <Tab label="Groups" />
            <Tab label="Tests" />
            <Tab label="Tasks" />
          </Tabs>
          {value === 0
            && (
            <TabContainer>
              <GroupsList id={this.props.match.params.id} />
            </TabContainer>
            )
            }
          {value === 1
            && (
            <TabContainer>
              <TeacherQuestionList />
            </TabContainer>
            )
          }
          {value === 2
            && (
            <TabContainer>
              <TeacherTasksList />
            </TabContainer>
            )
          }
        </AppBar>
        <Button onClick={this._logout} className={classes.createNewGroupButton} variant="contained">
          LOG OUT
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(TeacherMainPage);
