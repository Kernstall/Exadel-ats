import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import sharedStyles from './styles/Common';

const styles = ({
  defaultCursor: {
    cursor: 'default',
    userSelect: 'none',
  },
  header: {
    height: '60px',
    background: '#2196f3',
  },
  logoFontWhite: {
    fontWeight: 700,
  },
  logoFontBlue: {
    color: '#08233960',
  },
  ...sharedStyles,
});

function Header(props) {
  const { classes } = props;
  return (
    <div className={[classes.header, classes.flex].join(' ')}>
      <div className={[classes.center, classes.defaultCursor].join(' ')}>
        <span className={classes.logoFontWhite}>
          <span>
            A
          </span>
          <span className={classes.logoFontBlue}>
            TS
          </span>
        </span>
        <Grid className={classes.anim} />
      </div>
    </div>
  );
}

export default withStyles(styles)(Header);
