import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { GoogleApiWrapper } from "google-maps-react";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {},
  modal: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  card: {
    maxWidth: 600
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  divCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
});

class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          // keepMounted
          onClose={this.props.close}
          // aria-labelledby="alert-dialog-slide-title"
          // aria-describedby="alert-dialog-slide-description"
          scroll={"body"}
          // aria-labelledby="scroll-dialog-title"
        >
          <Card className={classes.card}>
            <CardHeader
              title={this.props.restaurant.name}
              subheader={this.props.restaurant.address}
            />
            <CardMedia
              className={classes.media}
              image={this.props.restaurant.image_url}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography component="p">
                {this.props.restaurant.annotation}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <Button onClick={this.props.close}>Fermer</Button>
              <Button href={this.props.restaurant.to_website} target="_blank">
                SITE WEB
              </Button>
            </CardActions>
          </Card>
        </Dialog>
      </div>
    );
  }
}

ModalCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  GoogleApiWrapper({
    apiKey: "AIzaSyBJWOhhYJVHkzShIFen7id4uZdFtooV4Xg"
  })(ModalCard)
);

/* <Map
                google={this.props.google}
                style={{ height: "40vh", width: "70%" }}
                initialCenter={{
                  lat: this.props.restaurant.latitude,
                  lng: this.props.restaurant.longitude
                }}
                zoom={13}
              >
                <Marker
                  name={"Your position"}
                  position={{
                    lat: this.props.restaurant.latitude,
                    lng: this.props.restaurant.longitude
                  }}
                  // icon={{
                  //   url: "/path/to/custom_icon.png",
                  //   anchor: new google.maps.Point(32, 32),
                  //   scaledSize: new google.maps.Size(64, 64)
                  // }}
                />
              </Map>
                */
