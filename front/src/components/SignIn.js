import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import red from "@material-ui/core/colors/red";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = theme => ({
  avatar: {
    backgroundColor: red[500],
    width: 120,
    height: 120
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        email: "",
        password: ""
      },
      flash: "",
      open: false,
      isAuthenticated: false
    };
    this.updateEmailField = this.updateEmailField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  updateEmailField(e) {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.id]: e.target.value
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    fetch("/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state.post)
    })
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            flash: res.message,
            // isAuthenticated: res.isAuthenticated,
            toast: res.toast
          });
          this.notify(res.toast, res.message);
          this.props.isAuthenticated(res);
          console.log(res);
        },
        err => console.log("erreur")
      );
    // this.props.history.push("/restaurants");
  }
  notify = (type, text) => {
    toast(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      type: type,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render(props) {
    const { classes } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100vh", backgroundColor: "#2c3e50" }}
      >
        {this.state.isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/restaurants"
            }}
          />
        ) : null}
        <Grid item xs={12}>
          <Paper elevation={4} style={{ margin: 32 }}>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{
                height: "80vh"
              }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                style={{
                  display: "flex",
                  justifyContent: "center"
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
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
