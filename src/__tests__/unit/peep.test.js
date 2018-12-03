import React from 'react';
import { shallow, mount } from 'enzyme';
import Peep from '../../peep'

let unlikedPeep = {"id": 3, "body": "my first peep :)", "created_at": "2018-06-23T13:21:23.317Z",
"updated_at": "2018-06-23T13:21:23.317Z", "user": {"id": 2, "handle": "james"},
"likes": [{"user": {"id": 1, "handle": "kay"}}]};

let likedPeep = {"id": 3, "body": "my first peep :)", "created_at": "2018-06-23T13:21:23.317Z",
"updated_at": "2018-06-23T13:21:23.317Z", "user": {"id": 2, "handle": "james"},
"likes": [{"user": {"id": 1, "handle": "kay"}}, {"user": {"id": 2, "handle": "james"}}]};

let currentUser = {"id": 2, "handle": "james"}
let notAuthor = {"id": 1, "handle": "kay"}

let mockPutLike = jest.fn();
let mockDeleteLike = jest.fn();

describe('Peep', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Peep data={unlikedPeep} currentUser={currentUser} putLike={mockPutLike} key={unlikedPeep.id}/>);
  });

  it('renders user handle', () => {
    let handle = <h2 className='peep-handle'>james</h2>;
    expect(wrapper.containsMatchingElement(handle)).toEqual(true);
  });

  it('renders a body', () => {
    let body = <h2 className='peep-body'>my first peep :)</h2>
    expect(wrapper.contains(body)).toEqual(true);
  });

  it('renders formatted date', () => {
    let date = <h2 className='peep-date'>14:21 23/6/2018</h2>
    expect(wrapper.contains(date)).toEqual(true);
  });

  it('renders a like count', () => {
    let likes = <h2 className='peep-likes'>1 Likes</h2>
    expect(wrapper.contains(likes)).toEqual(true);
  });

  describe('created by User', () => {
    it('renders delete button', () => {
      expect(wrapper.find('.delete-button').exists()).toEqual(true)
    })
  });

  describe('not created by User', () => {
    it('does not render delete button', () => {
      wrapper = shallow(<Peep data={unlikedPeep} currentUser={notAuthor}/>);
      expect(wrapper.find('.delete-button').exists()).toEqual(false)
    })
  })

  describe('not liked by User', () => {
    it('renders like button', () => {
      expect(wrapper.find('.like-button').exists()).toEqual(true);
    })

    it('does not render unlike button', () => {
      expect(wrapper.find('.unlike-button').exists()).toEqual(false);
    })

    it('clicking on like button calls postLike callback with post id as cb', () => {
      wrapper.find('.like-button').simulate('click');
      expect(mockPutLike).toHaveBeenCalledWith(3);
    });
  });

  describe('liked by User', () => {
    beforeEach(() => {
      wrapper = shallow(<Peep data={likedPeep} deleteLike={mockDeleteLike} currentUser={currentUser}/>);
    })

    it('renders unlike button', () => {
      expect(wrapper.find('.unlike-button').exists()).toEqual(true);
    })

    it('does not render like button', () => {
      expect(wrapper.find('.like-button').exists()).toEqual(false);
    })

    it('clicking on like button calls deleteLike callback with post id as cb', () => {
      wrapper.find('.unlike-button').simulate('click');
      expect(mockDeleteLike).toHaveBeenCalledWith(3);
    });
  })
});
