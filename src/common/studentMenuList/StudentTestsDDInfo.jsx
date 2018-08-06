import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const styles = theme => ({

  root: {
    width: '100%',
    backgroundColor: 'none',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  listItem: {
    backgroundColor: 'transparent',
  },
  minWidth: {
    minWidth: '100%',
  },
  minWidthItem: {
    minWidth: '50%',
  },
  buttonBack: {
    margin: '20px',
    color: '#fff',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1b77c5',
    },
  },
  link: {
    textDecoration: 'none',
    fontSize: '1rem',
    color: theme.palette.custom.blue,
  },
});

class StudentTestsDDInfo extends React.Component {
  render() {
    const { classes, test, availableTest } = this.props;
    const themes = test ? test.topicsNames.map(theme => theme.name) : null;
    if (test) {
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <ListItemText primary={themes.join(' ')} />
            </Grid>
            <Grid item xs={6}>
              <ListItemText primary={(test.result > 0) ? test.result : 'Не пройдено'} />
            </Grid>
          </Grid>
        </div>
      );
    }
    if (availableTest) {
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <ListItemText primary={availableTest.name} />
            </Grid>
            <Grid item xs={6}>
              <Link to={`/student/passingTest/${availableTest.id}`} className={classes.link}>
                Пройти
              </Link>
            </Grid>
          </Grid>
        </div>
      );
    }
    return null;
  }
}

StudentTestsDDInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestsDDInfo);
