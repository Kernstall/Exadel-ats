import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  footer: {
    height: 40,
    backgroung: theme.palette.background.paper,
  },
});

function Footer(props) {
  const { classes } = props;

  return (
    <div className={classes.footer}>
        Footer
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
