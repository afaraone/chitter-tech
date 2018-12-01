import React, {Component} from 'react';
import LoginForm from './loginform';
import PeepApiHandler from './peepapihandler';
import axios from 'axios';

class UserApiHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {},
            session: "",
            status: 'loggedOut',
            showButton: true
        };
        this.showButton = this.showButton.bind(this);
        this.postSession = this.postSession.bind(this);
        this.postUser = this.postUser.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
    };

    showButton() {
      this.setState({showButton: false});
    };

    postSession(handle, password) {
        axios.post('https://chitter-backend-api.herokuapp.com/sessions', {
            session: {handle: handle, password: password},
            headers: {"content-type": "application/json"}
        })
        .then(res => this.setState({
            userDetails: {userId: res.data.user_id, handle: handle},
            session: res.data.session_key,
            status: 'loggedIn',
            showButton: true
        }))
        .catch(() => this.setState({status: 'error'}));
    };

    deleteSession() {
        this.setState({
            userDetails: {},
            session: "",
            status: 'loggedOut',
            showButton: true
        });
    };

    postUser(handle, password) {
        axios.post('https://chitter-backend-api.herokuapp.com/users', {
            headers: {"content-type": "application/json"},
            user: {handle: handle, password: password}
        })
        .then(() => {
            this.postSession(handle, password)
        })
        .catch(() => this.setState({status: 'error'}));
    };

    render() {
        const showButton = this.state.showButton;
        const loggedIn = (this.state.status === "loggedIn");
        return(
            <>
            {showButton && !loggedIn && <button id='login-button' onClick={this.showButton}>Login / Register</button>}
            {!showButton && !loggedIn && <LoginForm postSession={this.postSession} postUser={this.postUser}/>}
            {loggedIn && <button id='logout-button' onClick={this.deleteSession}>Logout</button>}
            <PeepApiHandler userDetails={this.state.userDetails} session={this.state.session} loggedIn={loggedIn}/>
            </>
        );
    };
};

export default UserApiHandler;
