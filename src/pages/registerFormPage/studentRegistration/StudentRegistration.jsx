import React from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import FormSelect from '../../../common/shared/select/index';

const universities = {
  BSU: ['A1', 'B1', 'C1'],
  BSUIR: ['A2', 'B2', 'C2'],
};

class StudentRegistration extends React.Component {
  constructor() {
    super();

    this.state = {
      university: '',
      faculties: '',
    };

    this.handleSelectUnChange = this.handleSelectUnChange.bind(this);
    this.handleFacultyChange = this.handleFacultyChange.bind(this);
  }

  handleSelectUnChange(event) {
    this.setState({
      university: event.target.value,
      faculties: '',
    });
  }

  handleFacultyChange(event) {
    this.setState({
      faculties: event.target.value,
    });
  }

  render() {
    const universitiesArr = Object.keys(universities);
    const { university } = this.state;

    const facultiesArr = universities[university];

    return (
        <section className="student-container">
          <TextField
            id="with-placeholder"
            label="First name"
            placeholder="Input your name..."
            className="text-field first-name"
          />
          <TextField
            id="with-placeholder"
            label="Surname"
            placeholder="Input your surname..."
            className="text-field surname"
            margin="normal"
          />
          <FormSelect
            label="University"
            value={this.state.university}
            inputProps={{
              university: 'University',
              id: '0',
            }}
            onChange={this.handleSelectUnChange}
            options={universitiesArr}
          />
          {facultiesArr && <FormSelect
            label="Faculty"
            value={this.state.faculties}
            inputProps={{
              university: 'Faculty',
              id: '0',
            }}
            onChange={this.handleFacultyChange}
            options={facultiesArr}
          />}
          <TextField
            id="with-placeholder"
            label="Graduation year"
            placeholder="Input your graduation year..."
            className="text-field graduation"
          />
        </section>
    );
  }
}

export default StudentRegistration;
