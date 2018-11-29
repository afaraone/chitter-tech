import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from './loginform';

let postSession = jest.fn()
let postUser = jest.fn()

describe('LoginForm', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<LoginForm postSession={postSession} postUser={postUser}/>)
	})

	it('renders a form', () => {
		let loginHandle = <input type='text' className='login-form' id='login-handle'/>
		let loginPassword = <input type='text' className='login-form' id='login-password'/>
		let loginButton = <button>Login</button>
		let registerButton = <button>Register</button>
		expect(wrapper.containsMatchingElement(loginHandle)).toEqual(true)
		expect(wrapper.containsMatchingElement(loginPassword)).toEqual(true)
		expect(wrapper.containsMatchingElement(loginButton)).toEqual(true)
		expect(wrapper.containsMatchingElement(registerButton)).toEqual(true)
	})

	it('state.handle is set to val in input box', () => {
		let loginHandle = wrapper.find('#login-handle')
		loginHandle.simulate('change', {target: {value: 'Test'}})
		expect(wrapper.state('handle')).toEqual('Test')
	})

	it('state.handle is set to val in input box', () => {
		let loginPassword = wrapper.find('#login-password')
		loginPassword.simulate('change', {target: {value: 'Test'}})
		expect(wrapper.state('password')).toEqual('Test')
	})

	it('login submit triggers props callback', () => {
		wrapper.find('#login-submit').simulate('click')
		expect(postSession).toHaveBeenCalled()
	})

	it('register submit triggers props callback', () => {
		wrapper.find('#register-submit').simulate('click')
		expect(postUser).toHaveBeenCalled()
	})})
