import React from 'react';
import { InputLabel, FormControl, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  filled: {
    color: '#fff',
  },
  select: {
    backgroundColor: '#fff',
  },
});

const SelectList = ({ classes, arrondissement, restaurants }) => {
  const handleChange = () => event => {
    arrondissement(event.target.value);
  };
  const getArea = () => {
    let filteredArea = [];
    restaurants.map(restaurant =>
      filteredArea.find(address => address.area === restaurant.address2)
        ? null
        : filteredArea.push({ id: restaurant.id, area: restaurant.address2 })
    );
    return filteredArea;
  };
  const filteredArea = getArea();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        className={classes.filled}
        variant="filled"
        htmlFor="age-native-simple"
        focused={false}
      >
        Quartier de Paris
      </InputLabel>
      <Select
        className={classes.select}
        native
        onChange={handleChange('arrondissements')}
        inputProps={{
          name: 'arrondissements',
          id: 'arrondissements-native-simple',
        }}
      >
        <option value="tous">Tous</option>
        {filteredArea.map(restaurant => (
          <option key={restaurant.id} value={restaurant.area}>
            {restaurant.area}
          </option>
        ))}
        ?
      </Select>
    </FormControl>
  );
};

SelectList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectList);
