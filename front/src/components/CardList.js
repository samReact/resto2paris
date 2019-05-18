import React, { Component } from 'react';
import ReactStars from 'react-stars';
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Button,
  IconButton,
  Grid,
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import axios from 'axios';
import ModalCard from './ModalCard';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
    };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  notify = (type, text) => {
    toast(text, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      type,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  recordFavorite = async restaurant => {
    const { isAuthenticated, user, addFavoriteList } = this.props;
    if (isAuthenticated) {
      const token = await localStorage.getItem('token');
      const restaurantId = restaurant.id;
      const userId = user.id;
      return axios
        .post(
          `/api/favorites/${restaurant.id}`,
          { restaurantId, userId },
          {
            headers: { Authorization: `bearer ${token}` },
          }
        )
        .then(() => addFavoriteList(restaurant))
        .catch(err => this.notify('error', 'Vous devez être connecté !'));
    }
    return this.notify('info', 'Vous devez être connecté !');
  };

  handleExpandClick = b => {
    return () => {
      this.setState({ open: true, name: b });
    };
  };

  render() {
    const { classes, restaurants, favResto } = this.props;
    const { expanded, open, name } = this.state;

    return (
      <div className="container" style={{ paddingTop: 50 }}>
        <Grid container spacing={8}>
          {restaurants.map(restaurant => (
            <Grid key={restaurant.name} item xs={12} sm={6} md={4}>
              <Card name={restaurant} className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      <RestaurantIcon />
                    </Avatar>
                  }
                  action={
                    <IconButton
                      restaurant={restaurant}
                      onClick={() => this.recordFavorite(restaurant)}
                      aria-label="Add to favorites"
                    >
                      <FavoriteIcon
                        color={
                          favResto.length
                            ? favResto.find(elt => elt.id === restaurant.id)
                              ? 'secondary'
                              : 'disabled'
                            : 'disabled'
                        }
                      />
                    </IconButton>
                  }
                  title={`${restaurant.name}`}
                  subheader={`${restaurant.mainCategory} ${
                    restaurant.secondaryCategory
                  }`}
                />
                <CardMedia
                  className={classes.media}
                  image={restaurant.image_url}
                  title={
                    restaurant.description
                      ? restaurant.description
                      : restaurant.name
                  }
                />
                <CardContent>
                  <Typography component="p">{restaurant.area}</Typography>
                  <br />
                  <Typography component="p">
                    {restaurant.description}
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <ReactStars
                    value={restaurant.editorial_rating}
                    count={5}
                    size={15}
                    color2="#ffd700"
                    edit={false}
                  />
                  <Button
                    className={classes.expand}
                    onClick={this.handleExpandClick(restaurant)}
                    aria-expanded={expanded}
                    aria-label="Show more"
                  >
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ToastContainer />
        <ModalCard open={open} close={this.handleClose} restaurant={name} />
      </div>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardList);
