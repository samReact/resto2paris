import React, { Component } from "react";
import ReactStars from "react-stars";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import ModalCard from "./ModalCard";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  avatar: {
    backgroundColor: red[500]
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      open: false,
      name: "",
      favorite: false,
      flash: ""
    };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleExpandClick(b) {
    return () => {
      this.setState({ open: true, name: b });
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleFavorite(restaurant) {
    return () => {
      fetch(`/api/favorites/${restaurant.id}`, {
        method: "POST"
        // body: JSON.stringify(restaurant)
      })
        .then(res => res.json(), err => this.setState({ flash: err.flash }))
        .then(e => this.setState({ flash: "Super !" }))
        .then(console.log(this.state.flash));
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <Grid container spacing={8}>
          {this.props.restaurants.map(restaurant => (
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
                      onClick={this.handleFavorite(restaurant)}
                      aria-label="Add to favorites"
                    >
                      <FavoriteIcon color="secondary" />
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
                    color2={"#ffd700"}
                    edit={false}
                  />
                  <Button
                    className={classes.expand}
                    onClick={this.handleExpandClick(restaurant)}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    En savoir plus
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ModalCard
          open={this.state.open}
          close={this.handleClose}
          restaurant={this.state.name}
        />
      </div>
    );
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardList);
