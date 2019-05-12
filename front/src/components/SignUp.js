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

const styles = theme => ({
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
      flash: '',
      success: false,
      open: false,
      password2: '',
      isAuthenticated: false,

      // password2: ""
    };
    this.updateEmailField = this.updateEmailField.bind(this);
  }

  notify = () => {
    const { flash } = this.state;
    // const { history } = this.props;

    toast.success(flash, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      // onClose: () => history.push('/restaurants'),
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { post } = this.state;
    await axios
      .post('/auth/signup', post)

      .then(res => res.data)
      .then(res => {
        this.setState({
          flash: res.flash,
          // open: true,
          // isAuthenticated: true,
        });
      })
      .catch(err => this.setState({ flash: err.flash }));
    // .then(this.props.history.push('/restaurants'));
    this.notify();
  };

  updateEmailField(e) {
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        [e.target.id]: e.target.value,
      },
    });
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.state;
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
                        type="text"
                        required
                        label="Prenom"
                        id="name"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        type="text"
                        required
                        label="Nom"
                        id="lastname"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        type="email"
                        required
                        label="Email"
                        id="email"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        type="password"
                        required
                        label="Password"
                        id="password"
                        onChange={e => this.updateEmailField(e)}
                      />
                      <TextField
                        type="password"
                        required
                        label="Password2"
                        id="password2"
                        onChange={e =>
                          this.setState({ password2: e.target.value })
                        }
                      />
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
};

export default withRouter(withStyles(styles)(SignUp));
