import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SelectList from "./SelectList";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleFavorites = () => {
    // console.log("hello");
    this.setState({ anchorEl: null });
    this.props.favorites(54);
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton
              // className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              aria-owns={anchorEl ? "simple-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              style={{ fontSize: "20px" }}
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              Restos de Paris
            </Typography>
            {this.props.isAuthenticated ? (
              <Typography
                style={{ fontSize: "15px" }}
                variant="title"
                color="inherit"
                // className={classes.grow}
              >
                {this.props.isAuthenticated.message}
              </Typography>
            ) : null}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              transitionDuration={1000}
            >
              <MenuItem
                onClick={e => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/");
                }}
              >
                Les restaurants
              </MenuItem>
              <MenuItem
                onClick={e => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/map");
                }}
              >
                Carte des restaurants
              </MenuItem>

              <MenuItem
                onClick={e => {
                  // this.props.favorites(54);
                  // this.setState({ anchorEl: null });
                  this.props.history.push("/signin");

                  // this.handleFavorites
                }}
              >
                Mes Favoris
              </MenuItem>
            </Menu>

            <SelectList arrondissement={this.props.arrondissement} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(NavBar));
