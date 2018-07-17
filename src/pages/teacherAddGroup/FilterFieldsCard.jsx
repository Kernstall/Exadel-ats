import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import FormSelect from '../../common/Shared/select/index';

const styles = {
  card: {
    minWidth: 150,
    maxWidth: 300,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  CardHeaderFontSize: {
    'font-size': 'small',
  },
  textField: {
  },
  FlexContainerVertical: {
    display: 'flex',
    'flex-direction': 'column',
  },
};

const universities = {
  BSU: ['A1', 'B1', 'C1'],
  BSUIR: ['A2', 'B2', 'C2'],
};

class FilterStudentCard extends React.Component {
  constructor() {
    super();
    this.state = {
      university: '',
      faculties: '',
    };
  }


  handleSelectUnChange = (event) => {
    this.setState({
      university: event.target.value,
      faculties: '',
    });
  };

  handleFacultyChange = (event) => {
    this.setState({
      faculties: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const universitiesArr = Object.keys(universities);
    const { university } = this.state;
    const facultiesArr = universities[university];
    return (
      <Card className={classes.card}>
        <CardHeader subheader={<Typography className={classes.CardHeaderFontSize}>Введите данные студента для поиска</Typography>} />
        <CardContent className={classes.FlexContainerVertical}>
          <TextField
            id="Student Name"
            label="Имя студента"
            type="search"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="Student Email"
            label="Email"
            type="search"
            className={classes.textField}
            margin="normal"
          />
          <FormSelect
            label="University"
            value={this.state.university}
            className={classes.textField}
            inputProps={{
              university: 'University',
              id: '0',
            }}
            onChange={this.handleSelectUnChange}
            options={universitiesArr}
          />
          {facultiesArr && (
            <FormSelect
              label="Faculty"
              value={this.state.faculties}
              className={classes.textField}
              inputProps={{
                university: 'Faculty',
                id: '0',
              }}
              onChange={this.handleFacultyChange}
              options={facultiesArr}
            />
          )}
          <TextField
            id="with-placeholder"
            label="Год выпуска"
            className={classes.textField}
          />

        </CardContent>
      </Card>
    );
  }
}

FilterStudentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterStudentCard);
