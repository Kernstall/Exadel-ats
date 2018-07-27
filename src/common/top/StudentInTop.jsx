import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import medal from '../../img/medal-solid.svg';

const stylesCommon = {
  wrapper: {
    width: '100%',
    background: '#c3c3c320',
  },
};

const medalSize = 20;

const styles = {
  wrapper: {
    width: '100%',
    background: '#c3c3c320',
  },
  wrapper1: {
    ...stylesCommon,
  },
  itemText: {
    marginLeft: 20,
  },
  firstPlace: {
    backgroundColor: 'rgb(212,175,55)',
  },
  secondPlace: {
    backgroundColor: 'rgb(169,169,169)',
  },
  thirdPlace: {
    backgroundColor: 'rgb(222,184,135)',
  },
  otherPlaces: {
    backgroundColor: 'rgb(169,169,169, .3)',
  },
  medal: {
    display: 'inline-block',
    width: `${medalSize}px`,
    height: `${medalSize}px`,
    '-webkit-mask': `url(${medal}) no-repeat 50% 50%`,
    '-webkit-mask-size': 'cover',
    zIndex: '999',
    position: 'absolute',
  },
  medalAnimationHandler: {
    animation: '.2s pulse forwards',
    animationTimingFunction: 'cubic-beizer(.59,1.83,.8,.72)',
  },
  '@keyframes pulse': {
    '0%': {
      width: `${medalSize}px`,
      height: `${medalSize}px`,
    },
    '70%': {
      width: `${medalSize * 2}px`,
      height: `${medalSize * 2}px`,

    },
    '100%': {
      width: `${medalSize}px`,
      height: `${medalSize}px`,
    },
  },
};

class StudentInTop extends Component {
  constructor() {
    super();
    this.state = { isOver: false };
  };

  handleAnimation = () => {
    this.setState({ isOver: !this.state.isOver });
  };

  render() {
    const { classes, student, number } = this.props;
    let className;
    if (number == 0) {
      className = classes.firstPlace;
    } else if (number == 1) {
      className = classes.secondPlace;
    } else if (number == 2) {
      className = classes.thirdPlace;
    } else {
      className = classes.otherPlaces;
    }
    const animation = this.state.isOver ? ` ${classes.medalAnimationHandler}` : '';
    return (
      <ListItem
        className={classes.wrapper}
        onMouseEnter={this.handleAnimation}
        onMouseLeave={this.handleAnimation}
      >
        <div className={[className, classes.medal, animation, { root: classes.noMargin }].join(' ')} />
        <ListItemText className={classes.itemText} inset primary={student} />
      </ListItem>
    );
  }
}

export default withStyles(styles)(StudentInTop);
