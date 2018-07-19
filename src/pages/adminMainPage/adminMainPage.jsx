import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Common from '../../common/styles/Common';
import { getActivities } from '../../commands/activities';
import SearchBox from '../../common/searchBox/SearchBox.jsx';
import ActivityListItems from './ActivityListItems/ActivityListItems';

const styles = {
  ...Common,
  centerScreen: {
    width: '70%',
    margin: '0 auto',
    paddingTop: '10px',
  },
  '@media (max-width: 400px)': {
    centerScreenMobile: {
      width: '100%',
      display: 'flex',
    },
  },
  marginLeft: {
    marginLeft: '5px',
    width: 'calc(100% - 310px)',
  },
};

const activitieToUIName = (keyWord) => {
  const activitiesName = {
    studentGroupAddition: 'Студент добавлен в группу',
    studentGroupRemove: 'Студент удален из группы',
    groupCreation: 'Добавлена группа студентов',
    studentTaskAssignment: 'Назначена задача студенту',
    groupTaskAssignment: 'Назначена задача группе',
    studentTestAssignment: 'Назначен тест студенту',
    groupTestAssignment: 'Назначен тест группе',
    studentTaskSending: 'Стуент отправил решение задачи',
    studentTestComplete: 'Студент прошел тест',
    teacherTestCheck: 'Учитель проверил тест',
    studentQuestionComplaint: 'Студент пожаловался на вопрос',
    teacherQuestionCreation: 'Учитель создал вопрос',
    adminQuestionCreation: 'Администратор создал вопрос',
    teacherTaskCreation: 'Учитель создал задачу',
    adminTaskCreation: 'Администратор создал задачу',
    teacherQuestionBlock: 'Учитель заблокировал вопрос',
    adminQuestionBlock: 'Администратор заблокировал вопрос',
    teacherRightsToStudentDelegation: 'Студенту переданы права учителя',
    adminRightsToStudentDelegation: 'Студенту переданы права администратора',
    adminRightsToTeacherDelegation: 'Учителю переданы права администратора',
  };
  return activitiesName[keyWord];
};

const activities = {
  activities: [
    {
      name: 'Alexander Gusev',
      role: 'teacher',
      activityType: 'studentGroupAddition',
    },
    {
      name: 'Alexander Gusev',
      role: 'admin',
      activityType: 'studentGroupRemove',
    },
    {
      name: 'Alexander Gusev',
      role: 'teacher',
      activityType: 'groupCreation',
    },
    {
      name: 'Alexander Gusev',
      role: 'teacher',
      activityType: 'studentTaskAssignment',
    },
  ],
};

class adminMainPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        alignItems="stretch"
        justify="center"
        container
        flexDirection="row"
        className={[classes.centerScreen, classes.centerScreenMobile].join(' ')}
      >
        <Grid item>
          <SearchBox />
        </Grid>
        <Grid
          item
          className={classes.marginLeft}
        >
          <List
            disablePadding="false"
            component="nav"
            className={classes.noMargin}
          >
            <ActivityListItems info={activities.activities} />
          </List>
        </Grid>
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  activities: state.activities.activities,
});

const mapCommandsToProps = dispatch => ({
  getActivities: param => dispatch(getActivities(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(adminMainPage));
