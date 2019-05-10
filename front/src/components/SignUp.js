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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        email: "",
        password: "",
        name: "",
        lastname: ""
      },
      flash: "",
      success: false,
      open: false,
      password2: "",
      isAuthenticated: false

      // password2: ""
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

    fetch("/auth/signup", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state.post)
    })
      .then(res => res.json())
      .then(
        res =>
          this.setState({
            flash: res.flash,
            open: true,
            isAuthenticated: true
          }),
        this.notify(),
        err => this.setState({ flash: err.flash })
      );
    // .then(this.props.history.push("/restaurants"));
  }
  notify = () => {
    toast.success("Bienvenue !", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
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

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100vh", backgroundColor: "#2c3e50" }}
      >
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
                  {this.state.isAuthenticated ? (
                    <Redirect
                      to={{
                        pathname: "/restaurants"
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

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignUp));
