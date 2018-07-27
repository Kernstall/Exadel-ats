import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/es/styles/withStyles';
import generateRandomId from '../../util/generateRandomId';

const styles = {
  flexContainer: {
    display: 'flex',
  },
  minWidth: {
    'min-width': '10px',
  },
};

class CenteredTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = (event, value) => {
      this.setState({ value });
      this.props.callbackOnTabEvent(value);
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Tabs
          className={classes.minWidth}
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          // textColor="primary"
          centered
          fullWidth
        >

          {this.props.tabHeaders.map((tab, index) => (<Tab className="tab" label={tab.tabName} key={generateRandomId()} />))}

        </Tabs>
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  tabHeaders: PropTypes.array.isRequired,
  callbackOnTabEvent: PropTypes.func,
};

export default withStyles(styles)(CenteredTabs);
