import React, { Component } from 'react';
import { TextField, Button, Grid, FormGroup } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const styles = () => ({
  avatar: {
    backgroundColor: red[500],
    width: 120,
    height: 120,
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        email: '',
        password: '',
      },
    };
    this.updateEmailField = this.updateEmailField.bind(this);
  }

  notify = (type, text) => {
    const { history } = this.props;
    toast(text, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      type,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      onClose: () => history.push('/'),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { handleAuthenticated, favorites } = this.props;
    const { post } = this.state;

    fetch('/auth/signin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(post),
    })
      .then(res => res.json())
      .then(async res => {
        await handleAuthenticated(res.user, true);
        await localStorage.setItem('token', res.token);
        await favorites();
        this.notify(res.toast, res.message);
      })
      .catch(err => console.log(err));
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

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: '100vh', backgroundColor: '#2c3e50' }}
      >
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
                  <form onSubmit={this.handleSubmit}>
                    <h3>Sign in !</h3>
                    <FormGroup>
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
                    </FormGroup>
                    <Grid>
                      <Grid container justify="flex-end">
                        <Button
                          style={{ marginTop: 25 }}
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          LOGIN
                        </Button>
                      </Grid>
                      <Link to="/signup">Sign Up</Link>
                    </Grid>
                    <ToastContainer />
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

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignIn));
