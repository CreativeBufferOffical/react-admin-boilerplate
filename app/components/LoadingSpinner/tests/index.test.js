import React from 'react';
import { mount } from 'enzyme';

import Placeholder from 'components/Placeholder';
import LoadingSpinner from '../index';

describe('<LoadingSpinner />', () => {
  let component;

  beforeEach(() => {
    component = mount(<LoadingSpinner />);
  });

  it('should be a Placeholder', () => {
    expect(component.contains(Placeholder)).toBe(true);
  });
});
