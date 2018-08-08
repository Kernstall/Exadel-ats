import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import sharedStyles from './styles/Common';

const styles = ({
  footer: {
    height: 40,
    background: '#80808020',
    width: '100%',
    marginTop: 20,
  },
  ...sharedStyles,
});

function Footer(props) {
  const { classes } = props;

  return (
    <div className={[classes.footer, classes.flex].join(' ')}>
      <div
        className={[classes.center].join(' ')}
        style={{
          color: 'rgba(0, 0, 0, 0.3)',
          fontWeight: 300,
          fontSize: 20,
        }}
      >
        © Authomatic Testing System, 5 group
      </div>
    </div>
  );
}

export default withStyles(styles)(Footer);
