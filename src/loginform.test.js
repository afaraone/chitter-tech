import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from './loginform';

let postLogin = jest.fn()

describe('LoginForm', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<LoginForm postLogin={postLogin}/>)
	})

	it('renders a form', () => {
		let loginHandle = <input type='text' className='login-form' id='login-handle'/>
		let loginPassword = <input type='text' className='login-form' id='login-password'/>
		let submitButton = <button>Submit</button>
		expect(wrapper.containsMatchingElement(loginHandle)).toEqual(true)
		expect(wrapper.containsMatchingElement(loginPassword)).toEqual(true)
		expect(wrapper.containsMatchingElement(submitButton)).toEqual(true)
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

	it('submit triggers props callback', () => {
		wrapper.find('#login-submit').simulate('click')
		expect(postLogin).toHaveBeenCalled()
	})
})