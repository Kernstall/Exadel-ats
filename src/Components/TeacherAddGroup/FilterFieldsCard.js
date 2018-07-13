import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    minWidth: 150,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  CardHeaderFontSize: {
    'font-size': 'small',
  },
  textField: {
    '&:after': {
    },
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader subheader={<Typography className={classes.CardHeaderFontSize}>Введите данные студента для поиска</Typography>} />
        <CardContent>

          <TextField
            id="Student Name"
            label="Имя студента"
            type="search"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="Student Name"
            label="Email"
            type="search"
            className={classes.textField}
            margin="normal"
          />

        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
