import React from 'react';
import { shallow, mount } from 'enzyme';
import UserApiHandler from './userapihandler';
import LoginForm from './loginform';
import axios from 'axios'

jest.mock('axios')

describe('UserApiHandler', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<UserApiHandler />)
    })

    describe('postSession', () => {
        it('sets state to session and handle after successful login', done => {
            let data = {user_id: 1, session_key: "testSession"}
            axios.post.mockImplementation(() => Promise.resolve({data: data}))
            wrapper.instance().postSession("testHandle", "testPassword")
            setTimeout(() => {
                expect(wrapper.state('userDetails')).toEqual({userId: 1, handle: "testHandle"})
                expect(wrapper.state('session')).toEqual('testSession')
                expect(wrapper.state('status')).toEqual('loggedIn')
                done()                    
            })
        })

        it('sets state to error if not succesful', done => {
            axios.post.mockImplementation(() => Promise.reject())
            wrapper.instance().postSession("testHandle", "testPassword")
            setTimeout(() => {
                expect(wrapper.state('status')).toEqual('error')
                done()                    
            })
        })
    })

    describe('deleteSession', () => {
        it('resets state after logout', () => {
            wrapper.instance().deleteSession()
            expect(wrapper.state('userDetails')).toEqual({})
            expect(wrapper.state('session')).toEqual('')
            expect(wrapper.state('status')).toEqual('loggedOut')
        })
    })

    describe('postUser', () => {
        it('returns id and session', done => {
            let sessionRes = {user_id: 1, session_key: "testSession"}
            axios.post.mockImplementation(() => Promise.resolve({data: sessionRes}))
            wrapper.instance().postUser("testHandle", "testPassword")
            setTimeout(() => {
                expect(wrapper.state('userDetails')).toEqual({userId: 1, handle: "testHandle"})
                expect(wrapper.state('session')).toEqual('testSession')
                expect(wrapper.state('status')).toEqual('loggedIn')
                done()                    
            })
        })
    })


})