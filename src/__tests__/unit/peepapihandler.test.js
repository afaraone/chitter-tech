import React from 'react';
import { shallow } from 'enzyme';
import PeepApiHandler from '../../peepapihandler';
import PeepContainer from '../../peepcontainer';
import PeepForm from '../../peepform';
import axios from 'axios';
import {mockPeeps} from '../../mocks/mockObjects';

let userDetails = {userId: 1}
jest.mock('axios');

describe('PeepApiHandler', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PeepApiHandler userDetails={userDetails} session={"testSession"}/>, {disableLifecycleMethods: true});
  });

  describe('getPeeps', () => {
    beforeEach(() => {
      axios.get.mockImplementation(() => Promise.resolve({data: mockPeeps}));
      wrapper.instance().getPeeps();
    });

    it('saves peeps to list on success', done => {
      setTimeout(() => {
        expect(wrapper.state('peeps')).toEqual(mockPeeps);
        expect(wrapper.state('status')).toEqual('loaded');
        done();
      });
    });

    it('renders PeepContainer with props set to peeps', done => {
      setTimeout(() => {
        expect(wrapper.containsMatchingElement(<PeepContainer/>)).toBe(true);
        expect(wrapper.find(PeepContainer).props().peeps).toEqual(mockPeeps);
        done();
      });
    });

    it('returns error if unable to load peeps', done => {
      axios.get.mockImplementation(() => Promise.reject('error'));
      wrapper.instance().getPeeps();

      setTimeout(() => {
        expect(wrapper.state('status')).toEqual('error');
        done();
      });
    });
  });

  describe('postPeep', () => {
    it('makes makes post req and calls getPeeps', done => {
      let postReq = axios.post.mockImplementation(() => Promise.resolve());
      let spyGetPeeps = jest.spyOn(PeepApiHandler.prototype, 'getPeeps');

      wrapper.instance().postPeep('hello');
      setTimeout(() => {
        expect(postReq).toHaveBeenCalled();
        expect(spyGetPeeps).toHaveBeenCalled();
        done();
      });
    });

    it('sets status to error', done => {
      axios.post.mockImplementation(() => Promise.reject('error'));
      wrapper.instance().postPeep('hello');
      setTimeout(() => {
        expect(wrapper.state('status')).toEqual('error');
        done();
      });
    });
  });

  describe('putLike', () => {
    it('makes put req and calls getPeeps', done => {
      let putReq = axios.put.mockImplementation(() => Promise.resolve());
      let spyGetPeeps = jest.spyOn(PeepApiHandler.prototype, 'getPeeps');

      wrapper.instance().putLike();
      setTimeout(() => {
        expect(putReq).toHaveBeenCalled();
        expect(spyGetPeeps).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('on mount', () => {
    it('calls getPeeps', done => {
      let spyGetPeeps = jest.spyOn(PeepApiHandler.prototype, 'getPeeps');

      wrapper = shallow(<PeepApiHandler/>);
      setTimeout(() => {
        expect(spyGetPeeps).toHaveBeenCalled();
        done();
      });
    });
  });

  it('renders PeepForm if logged in', () => {
    wrapper = shallow(<PeepApiHandler loggedIn={true}/>);
    expect(wrapper.containsMatchingElement(<PeepForm/>));
  });
});
