import React from 'react';
import { shallow } from 'enzyme';

import Navigation from '../index';

describe('<Navigation />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Navigation />);
  });

  it('should exist', () => {
    expect(component.exists()).toBe(true);
  });
});
