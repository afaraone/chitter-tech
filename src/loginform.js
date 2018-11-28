import React, {Component} from 'react'

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = { handle: '' }
		this.updateHandle = this.updateHandle.bind(this)
		this.updatePassword = this.updatePassword.bind(this)
	}

	updateHandle(input) {
		this.setState({
			handle: input.target.value
		})
	}

	updatePassword(input) {
		this.setState({
			password: input.target.value
		})
	}

	render() {
		let {handle, password} = this.state
		return (
			<div className='login-form-container'>
			<input type='text' className='login-form' id='login-handle' onChange={this.updateHandle}/>
			<input type='text' className='login-form' id='login-password' onChange={this.updatePassword}/>
			<button id='login-submit' onClick={() => this.props.postLogin(handle, password)}>Submit</button>
			</div>
		)
	}
}

export default LoginForm