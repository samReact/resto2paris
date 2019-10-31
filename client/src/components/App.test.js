import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { App } from './App';
import NavBar from './NavBar';

jest.mock('axios');

const restaurants = [{ id: 1, name: 'kebab palace' }];
const resp = { data: restaurants };

describe('App', () => {
  describe('Before restaurants are fetched', () => {
    it('render an empty list of restaurants', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(NavBar).props().restaurants().toEqual([]);
    });
  });

  describe('After restaurants are fetched', () => {
    axios.get.mockImplementation(() => Promise.resolve(resp));
    it('render a list of restaurants', () => {
      const wrapper = shallow(<App />);
      setImmediate(() => {
        expect(wrapper.find(NavBar).props().restaurants).toEqual(restaurants);
      });
    });
  });
});
