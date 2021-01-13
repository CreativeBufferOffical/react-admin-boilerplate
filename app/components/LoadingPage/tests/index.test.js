import React from 'react';
import { mount } from 'enzyme';
import { Container } from 'reactstrap';

import LoadingSpinner from 'components/LoadingSpinner';
import LoadingPage from '../index';

describe('<LoadingPage />', () => {
  let component;

  beforeEach(() => {
    component = mount(<LoadingPage />);
  });

  it('should be a Container', () => {
    expect(component.contains(Container)).toBe(true);
  });

  it('should contain a LoadingSpinner', () => {
    expect(component.contains(LoadingSpinner)).toBe(true);
  });
});
