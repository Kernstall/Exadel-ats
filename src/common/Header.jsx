import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, Link, Redirect } from 'react-router-dom';
import sharedStyles from './styles/Common';
import logo from './logo.png';

const styles = ({
  header: {
    height: '60px',
    background: '#2196f3',
    backgroundImage: 'url("/123.png")',
  },
  img: {
    width: '2px',
    top: `${window.screen.height * 0.01}px`,
    left: `${window.screen.width / 2}px`,
    zIndex: '10',
    position: 'absolute',
    transition: '1s',
    '&:hover': {
      width: '1000px',
      top: `${window.screen.height * (-0.4)}px`,
      left: `${window.screen.width * (0)}px`,
      transform: 'rotate(1070deg)',
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
      </div>
    </div>
  );
}

export default withStyles(styles)(Header);
