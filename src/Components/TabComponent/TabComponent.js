import React from 'react';
import PropTypes from 'prop-types';
import CenteredTabs from './CenteredTabs';
import ContentContainer from './ContentContainer';

export default class TabComponent extends React.Component {
  render() {
    return (
      <div>
        <CenteredTabs tabHeaders={this.props.tabHeaders} />
        <ContentContainer />
      </div>
    );
  }
}

TabComponent.propTypes = {
  tabHeaders: PropTypes.array.isRequired,
};

CenteredTabs.defaultProps = {
  tabHeaders: [],
};
