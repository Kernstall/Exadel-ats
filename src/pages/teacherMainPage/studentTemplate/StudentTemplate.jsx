import React from 'react';
import Grid from '@material-ui/core/es/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

const styles = {
  root: {
    color: blue[600],
    '&$checked': {
      color: blue[500],
    },
  },
  colored: {
    color: '#000',
  },
  student: {
    width: '100%',
    padding: '10px 20px !important',
  },
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
  checked: {},
  no: {
    opacity: '0',
  },
};

class StudentTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checkFlag,
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleChange = name => e => {
    this.setState({
      [name]: e.target.checked,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.student}>
        <Grid className={classes.colored} container alignItems="center" justify="center" spacing={40}>
          <Grid item xs={3}>
            {this.props.name}
          </Grid>
          <Grid item xs={3}>
            {`Сдано задач: ${this.props.tasksComplete}`}
          </Grid>
          <Grid item xs={3}>
            {`Пройдено тестов: ${this.props.testsComplete}`}
          </Grid>
          <Grid item xs={2}>
            {`Балл: ${(this.props.score) ? this.props.score : 0}`}
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              className={classes.no}
              control={
                <Checkbox
                  checked={this.state.checked}
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  onChange={this.handleChange('checked')}
                  icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
                  checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
                  value="checkedI"
                />
              }
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(StudentTemplate);
