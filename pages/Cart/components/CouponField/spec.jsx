import React from 'react';
import { shallow } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import CouponField from './index';
import Layout from './components/Layout';
import NotSupported from './components/NotSupported';

// Mock the redux connect() method instead of providing a fake store.
jest.mock('./connector', () => obj => obj);

describe('CouponField', () => {
  it('should render as expected without any props', () => {
    const wrapper = shallow(<CouponField />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Layout).length).toBe(1);
    expect(wrapper.find(NotSupported).length).toBe(0);
  });

  it('should render a message when the cart supports coupons', () => {
    const wrapper = shallow(<CouponField isSupported />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Layout).length).toBe(1);
    expect(wrapper.find(NotSupported).length).toBe(0);
  });

  it('should render a message when the cart does not support coupons', () => {
    const wrapper = shallow(<CouponField isSupported={false} />, mockRenderOptions);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Layout).length).toBe(0);
    expect(wrapper.find(NotSupported).length).toBe(1);
  });
});
