import React from 'react';
import { shallow, mount } from 'enzyme';
import UserApiHandler from './userapihandler';
import LoginForm from './loginform';
import axios from 'axios'

jest.mock('axios')

describe('UserApiHandler', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(<UserApiHandler />)
    })

    it('renders a login form', () => {
        expect(wrapper.containsMatchingElement(LoginForm)).toEqual(true)
    })

    describe('logging in', () => {
        it('sets state to session and handle after login', done => {
            let data = {user_id: 1, session_key: "testSession"}
            axios.post.mockImplementation(() => Promise.resolve({data: data}))
            wrapper.instance().postSession("testHandle", "testPassword")
            setTimeout(() => {
                expect(wrapper.state('userId')).toEqual(1)
                expect(wrapper.state('session')).toEqual('testSession')
                expect(wrapper.state('loggedIn')).toEqual(true)
                console.log(wrapper.state())
                done()                    
            })
        })
    })
})