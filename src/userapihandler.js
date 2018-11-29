import React, {Component} from 'react';
import LoginForm from './loginform';
import axios from 'axios'

class UserApiHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            session: "",
            loggedIn: false,
            status: 'loading'
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
        .then((res) => this.setState({
            userId: res.data.user_id, session: res.data.session_key, status: 'done', loggedIn: true
        }))
        .catch(() => this.setState({status: 'error'}))
    }
    
    render() {
        return(
            <LoginForm postLogin={this.postSession}/>
        )
    }
}

export default UserApiHandler