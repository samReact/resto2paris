import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  filled: {
    color: "#fff"
  },
  select: {
    backgroundColor: "#fff"
  }
});

class SelectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrondissements: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.props.arrondissement(event.target.value);
  };
  render() {
    const { classes } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.filled}
          variant="filled"
          htmlFor="age-native-simple"
          focused={false}
        >
          Ardt de Paris
        </InputLabel>
        <Select
          className={classes.select}
          native
          // value={this.state.arrondissements}
          onChange={this.handleChange("arrondissements")}
          inputProps={{
            name: "arrondissements",
            id: "arrondissements-native-simple"
          }}
        >
          {/* <option value="" /> */}
          <option value={"tous"}>Tous</option>
          <option value={"1er"}>1er</option>
          <option value={"2e"}>2ème</option>
          <option value={"3e"}>3ème</option>
          <option value={"4e"}>4ème</option>
          <option value={"5e"}>5ème</option>
          <option value={"6e"}>6ème</option>
          <option value={"7e"}>7ème</option>
          <option value={"8e"}>8ème</option>
          <option value={"9e"}>9ème</option>
          <option value={"10e"}>10ème</option>
          <option value={"11e"}>11ème</option>
          <option value={"12e"}>12ème</option>
          <option value={"13e"}>13ème</option>
          <option value={"14e"}>14ème</option>
          <option value={"15e"}>15ème</option>
          <option value={"16e"}>16ème</option>
          <option value={"17e"}>17ème</option>
          <option value={"18e"}>18ème</option>
          <option value={"19e"}>19ème</option>
          <option value={"20e"}>20ème</option>
        </Select>
      </FormControl>
    );
  }
}

SelectList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectList);
