import React, { Component } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormGroup,
  Avatar,
  Paper,
} from '@material-ui/core';
import { Link, Redirect, withRouter } from 'react-router-dom';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import validator from 'validator';

const styles = () => ({
  avatar: {
    backgroundColor: red[500],
    width: 120,
    height: 120,
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        email: '',
        password: '',
        name: '',
        lastname: '',
      },
      password2: '',
      isAuthenticated: false,
      emailError: false,
      passwordError: false,
      nameError: false,
      lastnameError: false,
      password2Error: false,
    };
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

  handleSubmit = e => {
    e.preventDefault();
    const { post, password2 } = this.state;
    const { history } = this.props;

    if (
      validator.isEmpty(post.email) ||
      validator.isEmpty(post.password) ||
      validator.isEmpty(post.lastname) ||
      validator.isEmpty(post.name) ||
      validator.isEmpty(password2)
    ) {
      return this.setState({
        emailError: validator.isEmpty(post.email),
        passwordError: validator.isEmpty(post.password),
        nameError: validator.isEmpty(post.name),
        lastnameError: validator.isEmpty(post.lastname),
        password2Error: validator.isEmpty(password2),
      });
    }
    if (!validator.equals(post.password, password2)) {
      return this.setState({ errorValidationPassword: true });
    }
    return axios
      .post('/auth/signup', post)
      .then(res => res.data)
      .then(res => {
        this.notify(res.toast, res.message);
      })
      .then(() => history.push('/signin'))
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            return this.notify('error', error.response.data.errors);
          }
          if (error.response.status === 500) {
            return this.notify('error', error.response.data.message);
          }
        }
        return this.notify('error', error.message);
      });
  };

  updateEmailField = e => {
    const { post } = this.state;

    this.setState({
      post: {
        ...post,
        [e.target.id]: e.target.value,
      },
    });
  };

  render() {
    const { classes } = this.props;
    const {
      isAuthenticated,
      nameError,
      emailError,
      lastnameError,
      password2Error,
      passwordError,
      errorValidationPassword,
    } = this.state;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: '100vh', backgroundColor: '#2c3e50' }}
      >
        <ToastContainer />
        <Grid item xs={12}>
          <Paper elevation={4} style={{ margin: 32 }}>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{
                height: '80vh',
              }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Avatar className={classes.avatar}>
                  <RestaurantIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={8} container>
                <div className="container">
                  {isAuthenticated ? (
                    <Redirect
                      to={{
                        pathname: '/restaurants',
                      }}
                    />
                  ) : null}
                  <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up !</h3>
                    <FormGroup>
                      <TextField
                        error={nameError}
                        type="text"
                        required
                        label="Prenom"
                        id="name"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        error={lastnameError}
                        type="text"
                        required
                        label="Nom"
                        id="lastname"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        error={emailError}
                        type="email"
                        required
                        label="Email"
                        id="email"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        error={passwordError}
                        type="password"
                        required
                        label="Password"
                        id="password"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        error={password2Error || errorValidationPassword}
                        type="password"
                        required
                        label="Password2"
                        id="password2"
                        onChange={e =>
                          this.setState({ password2: e.target.value })
                        }
                      />
                      {errorValidationPassword && (
                        <div style={{ color: 'red' }}>
                          Les deux mots de passe doivent être identiques
                        </div>
                      )}
                    </FormGroup>
                    <Grid>
                      <Grid container justify="flex-end">
                        <Button
                          style={{ marginTop: 25 }}
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          SIGNUP
                        </Button>
                      </Grid>
                      <Link to="/signin">Sign In</Link>
                    </Grid>
                  </form>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignUp));
