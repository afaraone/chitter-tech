import React from 'react';
import { shallow, mount } from 'enzyme';
import PeepApiHandler from './peepapihandler';
import axios from 'axios';

jest.mock('axios')

describe('PeepApiHandler', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PeepApiHandler/>);
  });

  describe('getPeeps', () => {
    it('saves peeps to list on success', done => {
      let peeps = [{"id": 3, "body": "my first peep :)", "created_at": "2018-06-23T13:21:23.317Z",
    "updated_at": "2018-06-23T13:21:23.317Z", "user": {"id": 1, "handle": "kay"},
    "likes": [{"user": {"id": 1, "handle": "kay"}}]}]
      axios.get.mockImplementation(() => Promise.resolve({data: peeps}))
      wrapper.instance().getPeeps()
      setTimeout(() => {
        expect(wrapper.state('peeps')).toEqual(peeps)
        expect(wrapper.state('status')).toEqual('loaded')
        done()
      })
    })
  })
});
