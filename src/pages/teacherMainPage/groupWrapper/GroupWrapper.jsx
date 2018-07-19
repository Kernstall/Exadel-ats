import React from 'react';
import TeacherMainPage from '../TeacherMainPage.jsx';
import TeacherSelectedGroupComponent from '../teacherSelectedGroupComponent/TeacherSelectedGroupComponent.jsx';

class GroupWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false,
    };
  }

  _handleClick = () => {
    this.setState({
      flag: !this.state.flag,
    })
  };

  render() {
    return (
      this.state.flag ? <TeacherSelectedGroupComponent/> : <TeacherMainPage/>
    );
  }
}

export default GroupWrapper;
