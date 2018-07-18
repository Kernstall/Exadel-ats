import React from 'react';
import './styles.css';

const studentsPool = [
  {
    id: '1',
    studentName: 'Todd Martinez',
    eMail: '1234@mail.ru',
    studentGroup: 'group 2',
  },
  {
    id: '2',
    studentName: 'Jason Foster',
    eMail: '1234@mail.ru',
    studentGroup: 'group 2',
  },
  {
    id: '3',
    studentName: 'Shirley Allen',
    eMail: '1234@mail.ru',
    studentGroup: 'group 2',
  },
];

const selectedStudents = [
  {
    id: '4',
    studentName: 'Raman Buyak',
    eMail: '1234@mail.ru',
    studentGroup: 'group 2',
  },
  {
    id: '5',
    studentName: 'Anonymous',
    eMail: '1234@mail.ru',
    studentGroup: 'group 2',
  },
];

let availableStudents = [];

const updateAvailableStudents = function () {
  availableStudents = studentsPool.filter(
    element => selectedStudents.find(selElem => selElem.id === element.id) === undefined,
  );
};
updateAvailableStudents();

class DragAndDropStudents extends React.Component {
  constructor() {
    super();
    this.state = {
      changeFlag: true,
    };
  }

  componentDidMount() {
    /* window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('resize', this.handleResize); */
  }

  handleSingleLiClick(id) {
    console.log(availableStudents);
    let moveElem = availableStudents.find(element => element.id === id);
    if (moveElem !== undefined) {
      const index = availableStudents.indexOf(moveElem);
      availableStudents.splice(index, 1);
      selectedStudents.push(moveElem);
    } else {
      moveElem = selectedStudents.find(element => element.id === id);
      const index = selectedStudents.indexOf(moveElem);
      selectedStudents.splice(index, 1);
      availableStudents.push(moveElem);
    }
    this.setState({
      changeFlag: !this.state.changeFlag,
    });
  }

  render() {
    return (
      <div className="drag-and-drop-outer-wrapper">
        <div className="students-container">
          <div className="students-header">Студенты</div>
          <div className="students-wrap">
            <ul className="students-liner draggable droppable" id="students">
              {availableStudents.map(student => (
                <li
                  className="student"
                  key={student.id}
                  onClick={() => this.handleSingleLiClick(student.id)}
                >{student.studentName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mentor-container">
          <div className="mentor-header">Новая группа</div>
          <div className="mentor-wrap">
            <ul className="students-liner draggable droppable" id="students">
              {selectedStudents.map(student => (
                <li
                  className="student"
                  key={student.id}
                  onClick={() => this.handleSingleLiClick(student.id)}
                >{student.studentName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DragAndDropStudents;
