import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from '../Styles/Shared';

const styles = ({
  footer: {
    height: 40,
    background: '#8080805e',
  },
  ...sharedStyles,
});

function Footer(props) {
  const { classes } = props;

  return (
    <div className={[classes.footer, classes.flex].join(' ')}>
      <div className={classes.center}>
        Footer
      </div>
    </div>
  );
}

export default withStyles(styles)(Footer);
