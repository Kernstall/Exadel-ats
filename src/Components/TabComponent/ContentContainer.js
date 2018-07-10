import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import './style.css';

export default class ContentContainer extends React.Component {
  render() {
    return (
      <Paper className="ContentPanel">
        {this.props.component}
      </Paper>
    );
  }
}

ContentContainer.propTypes = {
  component: PropTypes.object,
};

ContentContainer.defaultProps = {
  component: undefined,
};
