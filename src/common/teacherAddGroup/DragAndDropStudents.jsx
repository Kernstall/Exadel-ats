import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './styles.css';

const styles = {

};
/* const styles = {
  wrap: {
  },
  wrapLiner: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '2rem',
    background: '#dadada',
  },
  students: {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
    'flex-basis': 0,
  },
  studentsContainer: {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
  },
  studentsHeader: {
    background: '#aaaaaa',
    color: 'whitesmoke',
    padding: '0.5rem',
  },
  studentsWrap: {
    display: 'flex',
    'flex-direction': 'column',
    'flex-grow': 1,
  },
  studentsLiner: {
    display: 'flex',
    'flex-direction': 'column',
    flex: 1,
    'flex-basis': 0,
    padding: '0.5rem',
    overflow: 'auto',
    transition: 'all .15s ease-in-out',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
  },
  '.ui-draggable-dragging': {
    'z-index': 999,
    'box-shadow': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
}; */

class DragAndDropStudents extends React.Component {
  render() {
    /* const { classes } = this.props; */
    return (
      <div className="drag-and-drop-outer-wrapper">
        <div className="students-container">
          <div className="students-header">Студенты</div>
          <div className="students-wrap">
            <ul className="students-liner draggable droppable" id="students">
              <li className="student">Todd Martinez</li>
              <li className="student">Jason Foster</li>
              <li className="student">Joyce Richardson</li>
              <li className="student">Karen Gonzalez</li>
              <li className="student">Mark Russell</li>
              <li className="student">Shirley Allen</li>
              <li className="student">Ronald Adams</li>
              <li className="student">Mark Russell</li>
            </ul>
          </div>
        </div>

        <div className="mentor-container">
          <div className="mentor-header">Новая группа</div>
          <div className="mentor-wrap">
            <ul className="students-liner draggable droppable" id="students">
              <li className="student">Todd Martinez</li>
              <li className="student">Jason Foster</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DragAndDropStudents;
