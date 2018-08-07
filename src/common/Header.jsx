import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import sharedStyles from './styles/Common';
import { logout } from '../commands/userLogin';

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
  position: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: 'black',

  },
  icon: {
    width: 38,
    height: 38,
    transition: '.3s',
    opacity: 0.3,
    '&:hover': {
      opacity: 0.8,
    },
  },
  ...sharedStyles,
});

class Header extends Component {
  _logout = () => {
    sessionStorage.removeItem('name');
    this.props.logout();
  };

  render() {
    const { classes } = this.props;
    const name = JSON.parse(sessionStorage.getItem('name'));
    console.log('name', name);
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
          {
            name && (
              <div>
                <Link onClick={this._logout} className={classes.position} to="/"><DirectionsRun className={classes.icon} /></Link>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userLogin: state.userLogin,
});

const mapCommandsToProps = dispatch => ({
  logout: param => dispatch(logout(param)),
});

export default connect(mapStateToProps, mapCommandsToProps)(withStyles(styles)(Header));
