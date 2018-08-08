import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
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
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5em',
    fontFamily: 'Roboto',
    color: theme.palette.custom.primary,
  },
  primary: {
    color: theme.palette.custom.primary,
  },
});


class StudentTestsDDInfo extends React.Component {
  render() {
    const { classes, test, availableTest, groupId } = this.props;
    const themes = test ? test.topicsNames.map(theme => theme.name) : null;
    if (test) {
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <ListItemText primary={themes.join(' ')} />
            </Grid>
            <Grid item xs={6}>
              {test.result > 0
              && <ListItemText primary={test.result} />
              }
              {!(test.result > 0)
              && (
              <Link to={`/student/examination/test/${groupId}/${test.id}`} className={classes.link}>
                <ListItemText primary="Пройти" />
              </Link>
              )
              }
              {/* <ListItemText primary={(test.result > 0) ? test.result : 'Не пройдено'} /> */}
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
              <Link to={`/student/passingTest/${groupId}/${availableTest.id}`} className={classes.link}>
                <ListItemText primary="Пройти" />
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
