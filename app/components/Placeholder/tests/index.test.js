import React from 'react';
import { mount } from 'enzyme';

import Placeholder from '../index';

const Child = () => <p>Test</p>;

describe('<Placeholder />', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Placeholder>
        <Child />
      </Placeholder>,
    );
  });

  it('should exist', () => {
    expect(component.exists()).toBe(true);
  });

  it('should contain a child', () => {
    expect(component.contains(Child)).toBe(true);
  });
});
