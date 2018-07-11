import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import sharedStyles from '../Styles/Common';




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
  ...sharedStyles,
};

const StudentInTop = (props) => {
  const { classes } = props;

  return (
    <ListItem button className={classes.wrapper}>
      <ListItem>

      </ListItem>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText inset primary={props.student} />
    </ListItem>
  );
};

export default withStyles(styles)(StudentInTop);
