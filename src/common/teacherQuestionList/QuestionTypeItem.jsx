import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core/es';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '92%',
    margin: 5,
  },
  questionType: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    width: '60%',
    boxSizing: 'border-box',
    maxWidth: '70%',
    fontSize: 17,
    fontWeight: 300,
  },
  questionsCount: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '30%',
  },
  questionsCountInner: {
    width: 'auto',
    backgroundColor: '#87CEFA',
    padding: '5px 12px 5px 10px',
    borderRadius: 5,
  },
});

class QuestionTypeItem extends React.Component {
  render() {
    const {
      classes, type, count,
    } = this.props;
    return (
      <div className="question">
        <Paper className={classes.root} elevation={1}>
          <Grid container className={classes.question} justify="space-between" wrap="nowrap">
            <Typography className={classes.questionType}>
              {type}
            </Typography>
            <Typography className={classes.questionsCount}>
              <span className={classes.questionsCountInner}>вопросов: {count}</span>
            </Typography>
          </Grid>
        </Paper>
      </div>
    );
  }
}

QuestionTypeItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionTypeItem);
