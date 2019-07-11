import React from 'react';
import { InputLabel, FormControl, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  select: {
    color: '#fff',
    '&:before': {
      borderColor: '#fff !important',
    },
    '&:after': {
      borderColor: '#fff !important',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    color: '#fff',
  },
  input: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const SelectList = ({ classes, arrondissement, restaurants }) => {
  const handleChange = () => event => {
    arrondissement(event.target.value);
  };
  const getArea = () => {
    const filteredArea = [];
    restaurants.map(restaurant =>
      filteredArea.find(address => address.area === restaurant.address2)
        ? null
        : filteredArea.push({ id: restaurant.id, area: restaurant.address2 })
    );
    return filteredArea;
  };
  const filteredArea = getArea();

  return (
    <FormControl className={classes.input}>
      <InputLabel
        className={classes.select}
        variant="filled"
        htmlFor="age-native-simple"
        focused={false}
      >
        Quartier de Paris
      </InputLabel>
      <Select
        className={classes.select}
        classes={{
          select: classes.select, // class name, e.g. `classes-nesting-root-x`
          icon: classes.icon,
          label: classes.label,
          root: classes.root,
        }}
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
