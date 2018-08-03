import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CaptionText from './captionText/CaptionText';

const styles = theme => ({
  zeroFilter: {
    width: '41%',
  },
  firstFilter: {
    width: '15%',
  },
  secondFilter: {
    width: '35%',
  },
  thirdFilter: {
    width: '9%',
  },
});

const Caption = ({ onChangeSorting, captionNames, sortBy, isDecreasing, classes }) => (
  <ListItem>
    <Grid container>
      <Grid className={classes.zeroFilter}>
        <CaptionText
          text={captionNames[0]}
          onChangeSorting={onChangeSorting}
          isSortedByMe={captionNames[0] === sortBy}
          isDecreasing={isDecreasing}
        />
      </Grid>
      <Grid className={classes.firstFilter}>
        <CaptionText
          text={captionNames[1]}
          onChangeSorting={onChangeSorting}
          isSortedByMe={captionNames[1] === sortBy}
          isDecreasing={isDecreasing}
        />
      </Grid>
      <Grid className={classes.secondFilter}>
        <CaptionText
          text={captionNames[2]}
          onChangeSorting={onChangeSorting}
          isSortedByMe={captionNames[2] === sortBy}
          isDecreasing={isDecreasing}
        />
      </Grid>
      <Grid className={classes.thirdFilter}>
        <CaptionText
          text={captionNames[3]}
          onChangeSorting={onChangeSorting}
          isSortedByMe={captionNames[3] === sortBy}
          isDecreasing={isDecreasing}
        />
      </Grid>
    </Grid>
  </ListItem>
);

export default withStyles(styles)(Caption);
