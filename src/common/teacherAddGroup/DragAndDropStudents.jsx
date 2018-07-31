import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/es/TextField/TextField';
import Input from '@material-ui/core/es/Input/Input';

export default class DragAndDropStudents extends React.Component {
  constructor(props) {
    super();
    this.state = {
      changeFlag: true,
    };
    this.selectedStudents = props.selectedStudents;
  }

  handleSingleLiClick(id) {
    let moveElem = this.availableStudents.find(element => element._id === id);
    if (moveElem !== undefined) {
      const index = this.availableStudents.indexOf(moveElem);
      this.availableStudents.splice(index, 1);
      this.selectedStudents.push(moveElem);
    } else {
      moveElem = this.selectedStudents.find(element => element._id === id);
      const index = this.selectedStudents.indexOf(moveElem);
      this.selectedStudents.splice(index, 1);
      this.availableStudents.push(moveElem);
    }
    this.setState({
      changeFlag: !this.state.changeFlag,
    });
  }

  render() {
    this.availableStudents = this.props.studentsPool.filter(
      element => this.selectedStudents.find(selElem => selElem._id === element._id) === undefined,
    );

    return (
      <div className="drag-and-drop-outer-wrapper">
        <div className="students-container">
          <div className="students-header">Студенты</div>
          <div className="students-wrap">
            <ul className="students-liner draggable droppable" id="students">
              {this.availableStudents.map(student => (
                <li
                  className="student"
                  key={student._id}
                  onClick={() => this.handleSingleLiClick(student._id)}
                >
                  <div className="studentContent">
                    {`${student.firstName} ${student.lastName}`}
                  </div>
                  <div className="studentContent">
                    {`${student.email}`}
                  </div>
                  <div className="studentContent">
                    {`${student.university}`}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mentor-container">
          <Input
            id="Student Email"
            placeholder="Введите имя"
            className="contentFit mentor-header"
            onChange={event => this.props.nameChangedCallback(event.target.value)}
          />
          <div className="mentor-wrap">
            <ul className="students-liner draggable droppable" id="students">
              {this.selectedStudents.map(student => (
                <li
                  className="student"
                  key={student._id}
                  onClick={() => this.handleSingleLiClick(student._id)}
                >
                  <div className="studentContent">
                    {`${student.firstName} ${student.lastName}`}
                  </div>
                  <div className="studentContent">
                    {`${student.email}`}
                  </div>
                  <div className="studentContent">
                    {`${student.university}`}
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

DragAndDropStudents.propTypes = {
  studentsPool: PropTypes.array.isRequired,
  nameChangedCallback: PropTypes.func.isRequired,
  selectedStudents: PropTypes.array.isRequired,
};
