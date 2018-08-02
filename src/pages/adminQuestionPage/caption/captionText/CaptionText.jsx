import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ListItem from '@material-ui/core/ListItem';
import localize from '../../../../localization/localization';

const styles = {
  captionText: {
    maxWidth: 'fit-content',
    padding: 0,
    fontFamily: '"Roboto",sans-serif',
    fontWeight: 100,
  },
  button: {
    cursor: 'pointer',
    userSelect: 'none',
    textTransform: 'none',
    '&:hover': {
      background: 'transparent',
    },
    padding: '0',
    margin: '0',
  },
  iconWrapper: {
    minWidth: '25px',
    minHeight: '30px',
    display: 'flex',
  },
  icon: {
    transition: '.2s ease-in-out',
    margin: 'auto',
  },
  sortedByMe: {
    color: 'red',
  },
  sortedByNotMe: {
    fontSize: '15px',
    color: 'grey',
    opacity: '30%',
  },
  decreasing: {

  },
  rising: {
    transform: 'rotate(180deg)',
  },
};

const CaptionText = ({ classes, text, onChangeSorting, isSortedByMe, isDecreasing }) => {
  const iconClasses = [` ${classes.icon}`];
  if (isSortedByMe) {
    iconClasses.push(classes.sortedByMe);
    if (isDecreasing) {
      iconClasses.push(` ${classes.decreasing}`);
    } else {
      iconClasses.push(` ${classes.rising}`);
    }
  } else {
    iconClasses.push(classes.sortedByNotMe);
  }
  return (
    <Grid
      onClick={onChangeSorting(text)}
      alignItems="flex-start"
      className={classes.captionText}
      container
      justify="row"
      wrap="nowrap"
      item
    >
      <ListItem
        className={classes.button}
        inset={false}
      >
        <ListItemText className={classes.captionText} secondary={localize(text)} />
        <div className={classes.iconWrapper}>
          <ArrowDropDown
            color="action"
            className={iconClasses}
          />
        </div>
      </ListItem>
    </Grid>
  );
};

export default withStyles(styles)(CaptionText);
