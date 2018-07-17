import React from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';
import FormSelect from '../../../common/Shared/select';

const universities = {
  BSU: ['A1', 'B1', 'C1'],
  BSUIR: ['A2', 'B2', 'C2'],
};

class TeacherRegistration extends React.Component {
  constructor() {
    super();

    this.state = {
      university: '',
    };

    this.handleSelectUnChange = this.handleSelectUnChange.bind(this);
  }

  handleSelectUnChange(event) {
    this.setState({
      university: event.target.value,
    });
  }

  render() {
    const universitiesArr = Object.keys(universities);

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
      </section>
    );
  }
}

export default TeacherRegistration;
