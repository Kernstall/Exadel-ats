import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import sharedStyles from '../../Styles/Common';

const stylesCommon = {
  wrapper: {
    width: '100%',
    background: '#c3c3c320',
  },
};

const styles = {
  wrapper: {
    width: '100%',
    background: '#c3c3c320',
  },
  wrapper1: {
    color: 'red',
    ...stylesCommon,
  },
  firstPlaces: {
    opacity: '1',
  },
  otherPlaces: {
    opacity: '0.3',
  },
  ...sharedStyles,
};

const StudentInTop = (props) => {
  const { classes, student, number } = props;
  let listItemIcon;
  console.log('index', number);
  if (number >= 0 && number < 3) {
    listItemIcon = <StarIcon className={classes.firstPlaces} />;
  } else {
    listItemIcon = <StarIcon className={classes.otherPlaces} />;
  }
  return (
    <ListItem button className={classes.wrapper}>
      <ListItemIcon>
        {listItemIcon}
      </ListItemIcon>
      <ListItemText inset primary={student} />
    </ListItem>
  );
};

export default withStyles(styles)(StudentInTop);
