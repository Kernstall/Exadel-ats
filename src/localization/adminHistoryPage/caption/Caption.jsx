import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import CaptionText from './captionText/CaptionText';

const Caption = ({ onChangeSorting, captionNames, sortBy, isDecreasing }) => (
  <ListItem>
    <Grid container justify="space-between" wrap="nowrap">
      {captionNames.map(caption => (
        <Grid>
          <CaptionText
            text={caption}
            onChangeSorting={onChangeSorting}
            isSortedByMe={caption === sortBy}
            isDecreasing={isDecreasing}
          />
        </Grid>
      ))}
    </Grid>
  </ListItem>
);

export default Caption;
