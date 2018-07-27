import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  hint: {
    position: 'absolute',
    opacity: 0,
    animation: '.2s 1s appearing forwards',
    background: '#eaf6ff',
    fontWeight: 300,
  },
  '@keyframes appearing': {
    to: {
      opacity: 1,
    },
  },
};

const Hint = ({ classes, suggestion, mauseCoordinates }) => {
  console.log(mauseCoordinates);
  const coords = {
    top: `${mauseCoordinates.y + 20}px`,
    left: `${mauseCoordinates.x}px`,
  };
  return (
    <Button className={[classes.hint].join(' ')} style={coords}>
      {suggestion}
    </Button>
  );
};

export default withStyles(styles)(Hint);
