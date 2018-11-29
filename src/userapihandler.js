import React, {Component} from 'react';
import LoginForm from './loginform';
import axios from 'axios'

class UserApiHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails: {},
            session: "",
            status: 'loggedOut'
        }
        this.postSession = this.postSession.bind(this)
    }

    postSession(handle, password) {
        let data = {"session": {handle: handle, password: password}}
        axios.post({
            url: 'https://chitter-backend-api.herokuapp.com/sessions',
            data: data,
            headers: {"content-type": "application/json"}
        })
        .then(res => this.setState({
            userDetails: {userId: res.data.user_id, handle: handle}, session: res.data.session_key, status: 'loggedIn'
        }))
        .catch(() => this.setState({status: 'error'}))
    }

    deleteSession() {
        this.setState({
            userDetails: {},
            session: "",
            status: 'loggedOut'
        })
    }

    postUser(handle, password) {
        let data = {"session": {handle: handle, password: password}}
        axios.post({
            url: 'https://chitter-backend-api.herokuapp.com/users',
            data: data,
            headers: {"content-type": "application/json"}
        })
        .then(() => {
            this.postSession(handle, password)
        })
        .catch(() => this.setState({status: 'error'}))
    }
    
    render() {
        return(
            <LoginForm postLogin={this.postSession}/>
        )
    }
}

export default UserApiHandler