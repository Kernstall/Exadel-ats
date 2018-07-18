import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import Common from '../../common/styles/Common';
import { getActivities } from '../../commands/activities';

const styles = {
  ...Common,
};

const activitieToUIName = () => {
  const activitiesName = {
    '1)studentGroupAddition': 'Студент добавлен в группу',
    '2)studentGroupRemove': 'Студент удален из группы',
    '3)groupCreation': 'Добавлена группа студентов',
    '4)studentTaskAssignment': 'Назначена задача студенту',
    '5)groupTaskAssignment': 'Назначена задача группе',
    '6)studentTestAssignment': 'Назначен тест студенту',
    '7)groupTestAssignment': 'Назначен тест группе',
    '8)studentTaskSending': 'Стуент отправил решение задачи',
    '9)studentTestComplete': 'Студент прошел тест',
    '10)teacherTestCheck': 'Учитель проверил тест',
    '11)studentQuestionComplaint': 'Студент пожаловался на вопрос',
    '12)teacherQuestionCreation': 'Учитель создал вопрос',
    '13)adminQuestionCreation': 'Администратор создал вопрос',
    '14)teacherTaskCreation': 'Учитель создал задачу',
    '15)adminTaskCreation': 'Администратор создал задачу',
    '16)teacherQuestionBlock': 'Учитель заблокировал вопрос',
    '17)adminQuestionBlock': 'Администратор заблокировал вопрос',
    '18)teacherRightsToStudentDelegation': 'Студенту переданы права учителя',
    '19)adminRightsToStudentDelegation': 'Студенту переданы права администратора',
    '20)adminRightsToTeacherDelegation': 'Учителю переданы права администратора',
  };
};

const activities =
{
  activities: [
    {
      name: 'Alexander Gusev',
      role: 'admin'
      activityType: '2)..',
    },
    {
      name: 'Alexander Gusev',
      activityType: '',
    },
  ],
};

class adminMainPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
  }

  render = () => <div>123</div>;
}

const mapStateToProps = state => ({
  activities: state.activities.activities,
});

const mapCommandsToProps = dispatch => ({
  getActivities: param => dispatch(getActivities(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(adminMainPage));
