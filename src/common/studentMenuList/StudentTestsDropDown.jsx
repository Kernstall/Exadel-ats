import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import StudentTestsDDInfo from './StudentTestsDDInfo';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  fullWidth: {
    width: '100%',
  },
});

class StudentTestsDropDown extends React.Component {
  render() {
    const { classes, testsInfo } = this.props;
    return (
      <div className={classes.fullWidth}>
        <List
          component="nav"
        >{
          testsInfo.map(
            (test, index) => (
              <StudentTestsDDInfo
                test={test}
                key={index}
              />
            ),
          )
        }
        </List>
      </div>
    );
  }
}

StudentTestsDropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTestsDropDown);
