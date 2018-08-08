import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class FormSelect extends React.Component {
  render() {
    const {
      label,
      value,
      inputProps,
      onChange,
      options,
      className,
    } = this.props;
    return (
      <FormControl className={className}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          inputProps={inputProps}
          onChange={onChange}
        >
          {options.map(item => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
    );
  }
}

export default FormSelect;
