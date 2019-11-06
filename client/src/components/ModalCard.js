import React from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  Slide,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

const styles = theme => ({
  root: {},
  modal: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  card: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  divCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
});

const ModalCard = ({ classes, restaurant, close, open }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={close}
        scroll="body"
      >
        <Card className={classes.card}>
          <CardHeader title={restaurant.name} subheader={restaurant.address} />
          <CardMedia
            className={classes.media}
            image={restaurant.image_url}
            title="restaurant"
          />
          <CardContent>
            <Typography component="p">{restaurant.annotation}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button onClick={close}>Fermer</Button>
            <Button href={restaurant.to_website} target="_blank">
              SITE WEB
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </div>
  );
};

ModalCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalCard);
