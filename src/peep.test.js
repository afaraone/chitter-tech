import React from 'react';
import { shallow, mount } from 'enzyme';
import Peep from './peep'

let peepData = {"id": 3, "body": "my first peep :)", "created_at": "2018-06-23T13:21:23.317Z",
"updated_at": "2018-06-23T13:21:23.317Z", "user": {"id": 1, "handle": "kay"},
"likes": [{"user": {"id": 1, "handle": "kay"}}, {"user": {"id": 2, "handle": "james"}}]}

describe('Peep', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Peep data={peepData} key={peepData.id}/>)
  })

  it('renders user handle', () => {
    let handle = <h2 className='peep-handle'>kay</h2>
    expect(wrapper.containsMatchingElement(handle)).toEqual(true)
  })

  it('renders a body', () => {
    let body = <h2 className='peep-body'>my first peep :)</h2>
    expect(wrapper.contains(body)).toEqual(true)
  })

  it('renders formatted date', () => {
    let date = <h2 className='peep-date'>14:21 23/06/2018</h2>
    expect(wrapper.contains(date)).toEqual(true)
  })

  it('renders a like count', () => {
    let likes = <h2 className='peep-likes'>2 Likes</h2>
    expect(wrapper.contains(likes)).toEqual(true)
  })
})
