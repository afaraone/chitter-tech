import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../App';
import UserApiHandler from '../../userapihandler';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('renders userApiHandler', () => {
    expect(wrapper.containsMatchingElement(UserApiHandler)).toBeTruthy();
  });
});
