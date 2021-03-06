import React from 'react';
import { shallow, mount } from 'enzyme';
import UserApiHandler from '../../userapihandler';
import LoginForm from '../../loginform';
import axios from 'axios';

jest.mock('axios');

describe('UserApiHandler', () => {
  let wrapper;
  beforeEach(() => {
      wrapper = shallow(<UserApiHandler />);
  });

  describe('loginButton', () => {
    let loginButton = <button id='login-button'>Login / Register</button>;
    it('shows register/login button', () => {
      expect(wrapper.containsMatchingElement(loginButton)).toBe(true);
      expect(wrapper.containsMatchingElement(<LoginForm/>)).toBe(false);
    });

    it('shows forms after button click', () => {
      wrapper.find('#login-button').simulate('click')
      expect(wrapper.containsMatchingElement(loginButton)).toBe(false);
      expect(wrapper.containsMatchingElement(<LoginForm/>)).toBe(true);
    });
  });

  describe('postSession', () => {
    it('sets state to session and handle after succesful call', done => {
      // setup succesful api req
      let data = {user_id: 1, session_key: "testSession"};
      axios.post.mockImplementation(() => Promise.resolve({data: data}));

      wrapper.instance().postSession("testHandle", "testPassword");
      setTimeout(() => {
        expect(wrapper.state('userDetails')).toEqual({id: 1, handle: "testHandle"});
        expect(wrapper.state('session')).toEqual('testSession');
        expect(wrapper.state('status')).toEqual('loggedIn');
        done();
      });
    });

    it('sets state to error if not succesful', done => {
      // setup unsuccesful api req
      axios.post.mockImplementation(() => Promise.reject());

      wrapper.instance().postSession("testHandle", "testPassword");
      setTimeout(() => {
        expect(wrapper.state('status')).toEqual('error');
        done();
      });
    });
  });

  describe('deleteSession', () => {
    it('resets state', () => {
      wrapper.instance().deleteSession();
      expect(wrapper.state('userDetails')).toEqual({});
      expect(wrapper.state('session')).toEqual('');
      expect(wrapper.state('status')).toEqual('loggedOut');
    });
  });

  describe('postUser', () => {
    it('returns id and session after successful call', done => {
      // setup succesful api req
      let sessionRes = {user_id: 1, session_key: "testSession"};
      axios.post.mockImplementation(() => Promise.resolve({data: sessionRes}));

      wrapper.instance().postUser("testHandle", "testPassword");
      setTimeout(() => {
        expect(wrapper.state('userDetails')).toEqual({id: 1, handle: "testHandle"});
        expect(wrapper.state('session')).toEqual('testSession');
        expect(wrapper.state('status')).toEqual('loggedIn');
        done();
      });
    });

    it('sets state to error', done => {
      // setup unsuccesful api req
      axios.post.mockImplementation(() => Promise.reject());

      wrapper.instance().postUser("testHandle", "testPassword");
      setTimeout(() => {
        expect(wrapper.state('status')).toEqual('error');
        done();
      });
    })
  });
});
