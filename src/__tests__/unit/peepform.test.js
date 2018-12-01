import React from 'react';
import { shallow, mount } from 'enzyme';
import PeepForm from '../../peepform';

let postPeep = jest.fn();

describe('LoginForm', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<PeepForm postPeep={postPeep}/>);
	});

	it('renders a form', () => {
		let peepTextbox = <input type='text' />;
		let peepSubmit = <button>Post</button>;
		expect(wrapper.containsMatchingElement(peepTextbox)).toEqual(true);
		expect(wrapper.containsMatchingElement(peepSubmit)).toEqual(true);
	});

	it('state.body is set to val in input box', () => {
		let peepTextbox = wrapper.find('#peep-textbox');
		peepTextbox.simulate('change', {target: {value: 'Test'}});
		expect(wrapper.state('body')).toEqual('Test');
	});

	it('peep submit triggers props callback', () => {
		wrapper.find('#post-peep').simulate('click');
		expect(postPeep).toHaveBeenCalled();
	});
});
