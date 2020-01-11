import React from 'react';
import { mount } from 'enzyme';
import { Button, sum } from './Button';

describe('when sum 1 + 2', () => {
  it('should return 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe('<Button />', () => {
  it('render button component without props', () => {
    const wrapper = mount(<Button>Accept</Button>);

    expect(wrapper.text()).toContain('Accept');
  });
});