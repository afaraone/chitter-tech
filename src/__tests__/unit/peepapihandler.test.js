import React from 'react';
import { shallow } from 'enzyme';
import PeepApiHandler from '../../peepapihandler';
import Peep from '../../peep';
import axios from 'axios';
import {mockPeeps} from '../../mocks/mockObjects'

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

    it('renders Peeps', done => {
      setTimeout(() => {
        expect(wrapper.find(Peep)).toHaveLength(mockPeeps.length);
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
});
