// Tests logging in, registration, logging out

import React from 'react';
import { shallow, mount } from 'enzyme';
import UserApiHandler from '../../userapihandler';
import PeepApiHandler from '../../peepapihandler';
import LoginForm from '../../loginform';
import axios from 'axios'
jest.mock('axios')

describe('Users', () => {
  let wrapper

  beforeEach(() => {
    // setup allow get req for peep api handler
    axios.get.mockImplementation(() => Promise.resolve())
    wrapper = mount(<UserApiHandler/>)

    // setup mock api call and enter user details
    let data = {user_id: 1, session_key: "testSession"};
    axios.post.mockImplementation(() => Promise.resolve({data: data}));
    wrapper.find('#login-button').simulate('click')
    wrapper.find('#login-handle').simulate('change', {target: {value: 'handle'}})
    wrapper.find('#login-password').simulate('change', {target: {value: 'password'}})
  })

  it('users details and session saved after logging in', done => {
    wrapper.find('#login-submit').simulate('click')
    setTimeout(() => {
      expect(wrapper.state('userDetails')).toEqual({userId: 1, handle: "handle"})
      expect(wrapper.state('session')).toEqual('testSession')
      expect(wrapper.state('status')).toEqual('loggedIn')
      done()
    })
  })
})
