import React, {Component} from 'react';
import LoginForm from './loginform';
import axios from 'axios'

class UserApiHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            session: "",
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
            userId: res.data.user_id, session: res.data.session_key, status: 'loggedIn'
        }))
        .catch(() => this.setState({status: 'error'}))
    }

    deleteSession() {
        this.setState({
            userId: "",
            session: "",
            status: 'loading'
        })
    }
    
    render() {
        return(
            <LoginForm postLogin={this.postSession}/>
        )
    }
}

export default UserApiHandler