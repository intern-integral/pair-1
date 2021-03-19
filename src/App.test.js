import React from 'react';
import { render } from '@testing-library/react';
import {shallow} from 'enzyme'
import App from './App';

test('renders <TodoPages /> component', () => { // coba
  const wrapper = shallow(<App />);
  expect(wrapper.find('TodoPages').exists()).toBeTruthy();
});
