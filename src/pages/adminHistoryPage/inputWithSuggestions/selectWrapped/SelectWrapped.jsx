import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import Option from '../option/Option';
import cutAfterNSymbols from '../../../../util';

const styles = {
  clearIcon: {
    position: 'absolute',
  },
};

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography> {'No results found'} </Typography>}
      arrowRenderer={arrowProps => (
        arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      )}
      clearRenderer={() => <ClearIcon className={classes.clearIcon} />}
      valueComponent={(valueProps) => {
        const { children } = valueProps;
        const s = cutAfterNSymbols.cutAfterNSymbols(children, 20, '...');
        return <div className="Select-value">{s}</div>;
      }}
      {...other}
    />
  );
}

export default withStyles(styles)(SelectWrapped);
