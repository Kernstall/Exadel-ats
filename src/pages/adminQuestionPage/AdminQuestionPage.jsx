import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/es';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Common from '../../common/styles/Common';
import { getAdminQuestions } from '../../commands/admin';
import SearchBox from './searchBox/SearchBox.jsx';
import ActivityListItems from './ActivityListItems/ActivityListItems';

const styles = {
  ...Common,
  marginLeft: {
    marginLeft: '5px',
    width: 'calc(100% - 310px)',
  },
  SearcBox: {
    minWidth: '300px',
  },
  menue: {
    margin: '10px',
  },
};

class AdminQuestionPage extends Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      historyFilter: {},
    };
  }

  componentDidMount() { // eslint-disable-next-line
    this.props.getAdminQuestions(this.state.historyFilter);
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.historyFilter === this.state.historyFilter
      || this.props.getAdminQuestions(this.state.historyFilter);
  }

  handleHistoryFilter = (props) => {
    const newState = {
      historyFilter: { ...props },
    };
    this.setState(newState);
  };

  render() {
    const { classes, adminQuestions } = this.props;
    if (adminQuestions) {
      const newAdminQuestions = adminQuestions.map(element => ({
        kind: `${element.kind}`,
        isTraining: `${element.isTraining ? 'тренировочный' : 'тестовый'}`,
        difficultyRate: `${element.difficultyRate}`,
        correctPrecent: `${Math.round((element.correntAnswersCount / element.wrongAnswersCount) * 100)}%`,
      }));
      return (
        <Grid
          alignItems="stretch"
          justify="center"
          container
          flexDirection="row"
          className={[classes.centerScreen, classes.centerScreenMobile].join(' ')}
        >
          <Grid item className={classes.SearcBox}>
            <SearchBox handleHistoryFilter={this.handleHistoryFilter} />
          </Grid>
          <Grid
            item
            className={classes.marginLeft}
          >
            <List
              disablePadding="false"
              component="nav"
              className={classes.noMargin}
            >
              <ActivityListItems info={newAdminQuestions} />
            </List>
          </Grid>
          <h1>Stats</h1>
        </Grid>
      );
    }
    return null;
  }
}


const mapStateToProps = state => ({
  adminQuestions: state.adminQuestions.adminQuestions,
});

const mapCommandsToProps = dispatch => ({
  getAdminQuestions: param => dispatch(getAdminQuestions(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(AdminQuestionPage));
