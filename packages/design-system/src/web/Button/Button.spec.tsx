import React from 'react';
import {mount} from 'enzyme';
import {Button} from './Button';

describe('<Button />', () => {
  it('render button component without props', () => {
    const wrapper = mount(<Button>Accept</Button>);

    expect(wrapper.text()).toContain('Accept');
  });
});
