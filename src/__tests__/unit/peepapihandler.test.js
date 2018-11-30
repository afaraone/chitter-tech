import React from 'react';
import { shallow, mount } from 'enzyme';
import PeepApiHandler from '../../peepapihandler';
import Peep from '../../peep'
import axios from 'axios';

jest.mock('axios');
let peeps = [{"id": 3, "body": "my first peep :)", "created_at": "2018-06-23T13:21:23.317Z",
"updated_at": "2018-06-23T13:21:23.317Z", "user": {"id": 1, "handle": "kay"},
"likes": [{"user": {"id": 1, "handle": "kay"}}]}];

describe('PeepApiHandler', () => {
  let wrapper;

  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve({data: peeps}));
    wrapper = shallow(<PeepApiHandler/>);
  });

  describe('on mount', () => {
    it('saves peeps to list on success', done => {
      setTimeout(() => {
        expect(wrapper.state('peeps')).toEqual(peeps);
        expect(wrapper.state('status')).toEqual('loaded');
        done();
      });
    });

    it('returns error if unable to load peeps', done => {
      axios.get.mockImplementation(() => Promise.reject('error'));
      wrapper = shallow(<PeepApiHandler/>);
      setTimeout(() => {
        expect(wrapper.state('status')).toEqual('error');
        done();
      });
    });

    it('renders Peeps', done => {
      setTimeout(() => {
        expect(wrapper.find(Peep)).toHaveLength(peeps.length);
        done();
      });
    });
  });
});
