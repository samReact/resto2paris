import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';
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
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      restaurantsFiltered: [],
      loading: true,
      favorites: [],
      user: null,
      token: null,
    };
  }

  componentDidMount() {
    // init.InitDb();
    this.getAllRestaurants();
  }

  getAllRestaurants = () =>
    axios
      .get('/api/restaurants')
      .then(res => {
        return this.setState({
          restaurants: res.data,
          restaurantsFiltered: res.data,
          loading: false,
          favorites: [],
        });
      })
      .catch(error => this.setState({ flash: error.flash }));

  getFavorites = async () => {
    const { token, user, restaurants } = this.state;
    const favorites = [];
    if (token) {
      const { id } = user;
      await axios
        .post(
          `/api/getFavorites/${id}`,
          {},
          {
            headers: { Authorization: `bearer ${token}` },
          }
        )
        // .then(res => res.data)
        .then(res => {
          restaurants.forEach(restaurant => {
            res.data.map(favoris =>
              favoris.restaurant_id === restaurant.id
                ? favorites.push(restaurant)
                : null
            );
          });
          console.log(favorites);
          this.setState({ restaurantsFiltered: favorites, favorites });
        })
        .catch(err => console.log(err));
    }
  };
  // .then(e => this.setState({ flash: 'Super !' }))
  // .then(console.log(this.state.flash));
  // };
  // }
  // toast.info(
  //   "Vous devez être connecté afin d'ajouter, un restaurant comme favoris.",
  //   {
  //     position: 'top-right',
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     // onClose: () => history.push('/restaurants'),
  //   }
  // );
  // const a = [];
  // const { restaurants } = this.state;
  // axios
  //   .get(`/api/favorites/${user}`)
  //   .then(res => res.data)
  //   .then(favorites =>
  //     restaurants.forEach(restaurant => {
  //       favorites.map(favoris =>
  //         favoris.id_restaurant === restaurant.id ? a.push(restaurant) : null
  //       );
  //     })
  //   )
  //   .then(
  //     this.setState({
  //       restaurantsFiltered: a,
  //       loading: false,
  //       favoritesMode: true,
  //     })
  //   )
  //   .catch(error => this.setState({ flash: error.flash }));

  handleAuthenticated = (user, token) =>
    this.setState({
      user,
      token,
    });

  filter = arrondissement => {
    const { restaurants, favorites } = this.state;
    const filtered = (favorites.length ? favorites : restaurants).filter(
      elt => elt.address2 === arrondissement
    );

    if (arrondissement === 'tous')
      return this.setState({
        restaurantsFiltered: favorites.length ? favorites : restaurants,
      });
    return this.setState({
      restaurantsFiltered: filtered,
    });
  };

  // showFavorites = () => {
  //   // this.getfavorites(user);
  //   console.log(user);
  // };

  render() {
    const { classes } = this.props;
    const { loading, restaurantsFiltered, user, token, favorites } = this.state;
    return (
      <div>
        <NavBar
          arrondissement={this.filter}
          favorites={this.getFavorites}
          allRestaurants={this.getAllRestaurants}
          user={user}
        />
        <div className="mt-5">
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
                    token={token}
                    favResto={favorites}
                  />
                )}
              />
              <Route
                path="/signin"
                render={() => (
                  <SignIn isAuthenticated={this.handleAuthenticated} />
                )}
              />
              <Route path="/signup" render={() => <SignUp />} />

              <Route
                path="/map"
                render={props => (
                  <MapList restaurants={restaurantsFiltered} {...props} />
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
};

export default withRouter(withStyles(styles)(App));
