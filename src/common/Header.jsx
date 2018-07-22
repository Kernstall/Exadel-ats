import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import sharedStyles from './styles/Common';
import logo from './logo.png';

const styles = ({
  header: {
    height: '60px',
    background: '#2196f3',
  },
  img: {
    width: '2px',
    top: `${window.screen.height * 0.01}px`,
    left: `${window.screen.width / 2}px`,
    position: 'absolute',
    zIndex: 99,
    transition: '1s',
    '&:hover': {
      animation: '3s mymove forwards, 3s red forwards, 10s 3s beat infinite linear',
    },
  },
  '@keyframes mymove': {
    '100%': {
      top: `${window.screen.height * (0)}px`,
      left: `${window.screen.width * (0.4)}px`,
      width: '30%',
      transform: 'rotate(1080deg)',
    },
  },
  '@keyframes beat': {
    '0%': {
      opacity: '1%',
    },
    '10%, 30%, 50%, 70%, 90%': {
      opacity: '20%',
      background: 'red',
      borderRadius: '100%',
    },
    '20%': {
      opacity: '100%',
      background: 'blue',
    },
    '40%': {
      opacity: '10%',
      background: 'green',
    },
    '60%': {
      opacity: '100%',
      background: 'yellow',
    },
    '80%': {
      opacity: '100%',
      background: 'blue',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  ...sharedStyles,
});

function Header(props) {
  const { classes } = props;
  return (
    <div className={[classes.header, classes.flex].join(' ')}>
      <div className={classes.center}>
        <img className={classes.img} src={logo} alt="fireSpot" />
        <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
          Logo
        </Link>
        <Grid className={classes.anim} />
      </div>
    </div>
  );
}

export default withStyles(styles)(Header);
