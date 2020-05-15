import React from 'react';
import { mountWithTheme } from '../../../../../__tests__/helpers';

import DefaultButton from '..';

describe('Unit | DefaultButton', () => {
  const onPress = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create snapshot', () => {
    const wrapper = mountWithTheme(
      <DefaultButton onPress={onPress} text="Press me" variant="primary" />,
    );

    expect(wrapper.text()).toMatchSnapshot();
  });

  it('should render a Button with a label Press me', () => {
    const wrapper = mountWithTheme(
      <DefaultButton onPress={onPress} text="Press me" variant="primary" />,
    );

    expect(wrapper.text()).toContain('Press me');
  });

  it('should call the onPress function one time', () => {
    const wrapper = mountWithTheme(
      <DefaultButton testID="button" onPress={onPress} text="Press me" variant="primary" />,
    );

    const onPressHandler = wrapper
      .find('[testID="button"]')
      .first()
      .prop('onPress') as () => void;

    onPressHandler();

    expect(onPress).toBeCalledTimes(1);
  });

  it.skip('should render a Button with a Loading', () => {
    const wrapper = mountWithTheme(
      <DefaultButton loading onPress={onPress} text="Press me" />,
    );

    expect(wrapper.find('[testID="loadingIndicator"]').exists()).toBeTruthy();
  });

  it.skip('should call the onPress function zero times if the button is loading', () => {
    const wrapper = mountWithTheme(
      <Button loading onPress={onPress} text="Press me" />,
    );

    const onPressHandler = wrapper
      .find('[testID="button"]')
      .at(2)
      .prop('onPress') as () => void;

    onPressHandler();

    expect(onPress).toBeCalledTimes(0);
  });

  it.skip('should call the onPress function zero times if the button is disabled', () => {
    const wrapper = mountWithTheme(
      <Button disabled onPress={onPress} text="Press me" />,
    );

    const onPressHandler = wrapper
      .find('[testID="button"]')
      .at(2)
      .prop('onPress') as () => void;

    onPressHandler();

    expect(onPress).toBeCalledTimes(0);
  });

  it.skip('should compare a snapshot with a disabled style', () => {
    const wrapper = mountWithTheme(
      <DefaultButton disabled onPress={onPress} text="Press me" />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should compare a snapshot with a loading style', () => {
    const wrapper = mountWithTheme(
      <Button loading onPress={onPress} text="Press me" />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
