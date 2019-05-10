import React, { Component } from "react";
import CardList from "./CardList";
import { Route, Switch, withRouter } from "react-router-dom";
import MapList from "./MapList";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import axios from "axios";
// import * as init from "./InitDb";

const styles = theme => ({
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      restaurantsFiltered: [],
      loading: true,
      favorites: [],
      favoritesMode: false,
      isAuthenticated: false
    };
    this.filter = this.filter.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.handleAuthenticated = this.handleAuthenticated.bind(this);
  }

  componentDidMount() {
    // init.InitDb();
    axios
      .get("/api/restaurants", {
        method: "get"
      })
      .then(res => {
        console.log(res);
        return this.setState({
          restaurants: res.data,
          restaurantsFiltered: res.data,
          loading: false
        });
      })
      .catch(error => this.setState({ flash: error.flash }));
  }
  handleAuthenticated(bool) {
    this.setState({
      isAuthenticated: bool
    });
  }

  filter(n) {
    const arrondissement = n;
    let filtered = this.state.restaurants.filter(
      elt => elt.address2 === arrondissement
    );

    arrondissement === "tous"
      ? this.setState({
          restaurantsFiltered: this.state.restaurants
        })
      : this.setState({
          restaurantsFiltered: filtered
        });
  }
  getfavorites = user => {
    let a = [];
    fetch(`/api/favorites/${user}`, {
      method: "get"
    })
      .then(res => res.json(), err => this.setState({ flash: err.flash }))
      .then(favorites =>
        this.state.restaurants.forEach(function(restaurant) {
          favorites.map(favoris =>
            favoris.id_restaurant === restaurant.id ? a.push(restaurant) : null
          );
        })
      )
      .then(
        this.setState({
          restaurantsFiltered: a,
          loading: false,
          favoritesMode: true
        })
      );
  };
  showFavorites(user) {
    this.getfavorites(user);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar
          arrondissement={this.filter}
          favorites={this.showFavorites}
          isAuthenticated={this.state.isAuthenticated}
        />
        <div className="mt-5">
          {this.state.loading ? (
            <div className={classes.spinner}>
              <CircularProgress size={100} thickness={5} />
            </div>
          ) : (
            <Switch>
              <Route
                exact
                path="/signin"
                render={props => (
                  <SignIn isAuthenticated={this.handleAuthenticated} />
                )}
              />
              <Route exact path="/signup" render={props => <SignUp />} />

              <Route
                path="/map"
                render={props => (
                  <MapList
                    restaurants={this.state.restaurantsFiltered}
                    {...props}
                  />
                )}
              />
              <Route
                path="/restaurants"
                render={props => (
                  <CardList
                    restaurants={this.state.restaurantsFiltered}
                    {...props}
                  />
                )}
              />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(App));
