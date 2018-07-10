import React from 'react';
import PropTypes from 'prop-types';
import CenteredTabs from './CenteredTabs';
import ContentContainer from './ContentContainer';

export default class TabComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponent: undefined,
    };

    this.selectedTabChanged = this.selectedTabChanged.bind(this);
  }

  selectedTabChanged(tabNum) {
    this.setState({ selectedComponent: this.props.tabHeaders[tabNum].component });
  }

  render() {
    return (
      <div>
        <CenteredTabs
          tabHeaders={this.props.tabHeaders}
          callbackOnTabEvent={this.selectedTabChanged}
        />
        <ContentContainer component={this.state.selectedComponent} />
      </div>
    );
  }
}

TabComponent.propTypes = {
  tabHeaders: PropTypes.array.isRequired,
};

TabComponent.defaultProps = {
};
