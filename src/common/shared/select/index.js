import React from 'react';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import Select from '@material-ui/core/es/Select/Select';
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
    } = this.props;

    return (
      <FormControl className="text-field">
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
