
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  option: {
    fontSize: '1em',
    maxWidth: '240px',
  },
};

class Option extends React.Component {
  handleClick = (event) => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const {
      children, isFocused, isSelected, onFocus, classes
    } = this.props;

    return (
      <MenuItem
        className={classes.option}
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

export default withStyles(styles)(Option);
