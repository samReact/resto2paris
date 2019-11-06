import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CardList from './CardList';
import MapList from './MapList';
import NavBar from './NavBar';
import SignIn from './SignIn';
import SignUp from './SignUp';

// import * as init from './InitDb';

const styles = theme => ({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  toolbar: theme.mixins.toolbar,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      restaurantsFiltered: [],
      loading: true,
      favorites: [],
      favoritesFiltered: [],
      user: null,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    // init.InitDb();
    this.getAllRestaurants();
  }

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

  getAllRestaurants = () =>
    axios
      .get('/api/restaurants')
      .then(res => {
        return this.setState({
          restaurants: res.data,
          restaurantsFiltered: res.data,
          loading: false,
        });
      })
      .catch(error => this.notify('error', error.flash));

  getFavorites = () => {
    const { isAuthenticated, user, restaurants } = this.state;
    const favorites = [];
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      const { id } = user;
      axios
        .post(
          `/api/getFavorites/${id}`,
          {},
          {
            headers: { Authorization: `bearer ${token}` },
          }
        )
        .then(res => {
          restaurants.forEach(restaurant => {
            res.data.map(favoris =>
              favoris.restaurant_id === restaurant.id
                ? favorites.push(restaurant)
                : null
            );
          });
          return this.setState({ favorites, favoritesFiltered: favorites });
        })
        .catch(error => this.notify('error', error.flash));
    }
  };

  handleAuthenticated = (user, isAuthenticated) =>
    this.setState({
      user,
      isAuthenticated,
    });

  filter = arrondissement => {
    const { restaurants, favorites } = this.state;
    const restaurantsFiltered = restaurants.filter(
      restaurant => restaurant.address2 === arrondissement
    );
    const favoritesFiltered = favorites.filter(
      favorite => favorite.address2 === arrondissement
    );

    if (arrondissement === 'tous')
      return this.setState({
        restaurantsFiltered: restaurants,
        favoritesFiltered: favorites,
      });
    return this.setState({
      restaurantsFiltered,
      favoritesFiltered,
    });
  };

  addFavoriteList = restaurant => {
    const { favorites } = this.state;
    favorites.push(restaurant);
    this.setState({ favorites });
  };

  removeFavoriteList = restaurant => {
    const { favorites } = this.state;
    const updatedFavorites = favorites.filter(
      favorite => favorite.id !== restaurant.id
    );
    this.setState({
      favorites: updatedFavorites,
      favoritesFiltered: updatedFavorites,
    });
  };

  signOut = () => {
    const { history } = this.props;
    axios
      .get('/auth/signout')
      .then(res => res.data)
      .then(res =>
        this.setState({
          user: res.user,
          isAuthenticated: false,
          favorites: [],
          favoritesFiltered: [],
        })
      )
      .then(() => localStorage.removeItem('token'))
      .then(() => this.getAllRestaurants())
      .then(() => this.notify('success', 'Au revoir !'))
      .then(() => history.push('/'))
      .catch(error => {
        if (error.response) {
          return this.notify('error', error.response.data.message);
        }
        return this.notify('error', error.message);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      loading,
      restaurantsFiltered,
      favoritesFiltered,
      user,
      isAuthenticated,
      favorites,
      restaurants,
    } = this.state;

    return (
      <div>
        <ToastContainer />
        <NavBar
          arrondissement={this.filter}
          allRestaurants={this.getAllRestaurants}
          user={user}
          isAuthenticated={isAuthenticated}
          signout={this.signOut}
          restaurants={restaurants}
        />
        <div className={classes.toolbar} />

        <div>
          {loading ? (
            <div className={classes.spinner}>
              <CircularProgress size={100} thickness={5} />
            </div>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <CardList
                    restaurants={restaurantsFiltered}
                    {...props}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    addFavoriteList={this.addFavoriteList}
                    removeFavoriteList={this.removeFavoriteList}
                    favorites={favorites}
                  />
                )}
              />
              <Route
                path="/favorites"
                render={props => (
                  <CardList
                    restaurants={favoritesFiltered}
                    {...props}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    addFavoriteList={this.addFavoriteList}
                    removeFavoriteList={this.removeFavoriteList}
                    favorites={favorites}
                  />
                )}
              />
              <Route
                path="/signin"
                render={() => (
                  <SignIn
                    handleAuthenticated={this.handleAuthenticated}
                    favorites={this.getFavorites}
                  />
                )}
              />
              <Route path="/signup" render={() => <SignUp />} />

              <Route
                path="/map"
                render={props => (
                  <MapList
                    restaurants={restaurantsFiltered}
                    favorites={favoritesFiltered}
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
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export { App };
export default withRouter(withStyles(styles)(App));
