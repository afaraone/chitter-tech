import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from './loginform';

describe('LoginForm', () => {
	it('renders without crashing', () => {
		shallow(<LoginForm />);
	})
})