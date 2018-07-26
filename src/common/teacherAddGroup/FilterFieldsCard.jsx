import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/es/Button/Button';
import FormControl from '@material-ui/core/es/FormControl/FormControl';
import FormSelect from '../shared/select/index';

const styles = {
  card: {
    minWidth: 200,
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
  FlexContainerVertical: {
    display: 'flex',
    'flex-direction': 'column',
  },
  contentFit: {
    'margin-top': '0.5rem',
  },
  formControl: {
    overflow: 'hidden',
  },
  formSelectWrapper: {
    'margin-top': '0.5rem',
    width: '100%',
  },
};

const universities = {
  БГУ: ['A1', 'B1', 'C1'],
  БГУИР: ['A2', 'B2', 'C2'],
};

class FilterStudentCard extends React.Component {
  constructor() {
    super();
    this.state = {
      university: '',
      faculties: '',
    };

    this.handleSelectUnChange = this.handleSelectUnChange.bind(this);
    this.handleFacultyChange = this.handleFacultyChange.bind(this);
  }


  handleApplyFilter() {
    const filter = {};
    filter.name = document.querySelector('#Student_Name').value;
    filter.email = document.querySelector('#Student_Email').value;
    filter.university = this.state.university;
    filter.faculty = this.state.faculties;
    filter.year = parseInt(document.querySelector('#graduation_year').value, 10);
    this.props.callback(filter);
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
    const { classes } = this.props;
    const universitiesArr = Object.keys(universities);
    const { university } = this.state;
    const facultiesArr = universities[university];

    return (
      <Card className={classes.card}>
        <CardHeader
          subheader={
            <Typography className={classes.CardHeaderFontSize}>Введите данные студента для поиска</Typography>
            }
        />
        <CardContent className={classes.FlexContainerVertical}>

          <FormControl className={classes.formControl}>
            <TextField
              id="Student_Name"
              label="Имя студента"
              type="search"
              className={classes.contentFit}
              margin="normal"
            />
            <TextField
              id="Student_Email"
              label="Email"
              type="search"
              className={classes.contentFit}
              margin="normal"
            />
            <FormSelect
              className={classes.formSelectWrapper}
              type="search"
              label="Университет"
              value={this.state.university}
              fullWidth
              inputProps={{
                university: 'University',
                id: '0',
              }}
              onChange={this.handleSelectUnChange}
              options={universitiesArr}
            />
            {facultiesArr && (
            <FormSelect
              className={classes.formSelectWrapper}
              fullWidth
              type="search"
              label="Факультет"
              value={this.state.faculties}
              inputProps={{
                university: 'Faculty',
                id: '0',
              }}
              onChange={this.handleFacultyChange}
              options={facultiesArr}
            />
            )}
            <TextField
              type="search"
              id="graduation_year"
              label="Год выпуска"
              className={classes.contentFit}
            />
            <Button className={classes.contentFit} onClick={() => this.handleApplyFilter()}>
              Filter
            </Button>
          </FormControl>

        </CardContent>
      </Card>
    );
  }
}

FilterStudentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
};

export default withStyles(styles)(FilterStudentCard);
