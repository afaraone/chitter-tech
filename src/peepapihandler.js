import React, {Component} from 'react';
import PeepContainer from './peepcontainer';
import PeepForm from './peepform';
import axios from 'axios';

class PeepApiHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { peeps: [], status: 'loading' };
    this.postPeep = this.postPeep.bind(this)
    this.putLike = this.putLike.bind(this)
    this.deleteLike = this.deleteLike.bind(this)
    this.deletePeep = this.deletePeep.bind(this)
  };

  componentDidMount() {
    this.getPeeps();
  };

  getPeeps() {
    axios.get("https://chitter-backend-api.herokuapp.com/peeps")
    .then(res => this.setState({peeps: res.data, status: 'loaded' }))
    .catch(err => this.setState({ status: err}));
  };

  postPeep(body) {
    let data = {"user_id": this.props.userDetails.id, "body": body}
    axios.post("https://chitter-backend-api.herokuapp.com/peeps",
      {peep: data},
      {headers: {
        "content-type": "application/json",
        "Authorization": 'Token token=' + this.props.session
      }
    })
    .then(() => this.getPeeps())
    .catch(err => this.setState({ status: err}));
  };

  deletePeep(peepId) {
    axios.delete("https://chitter-backend-api.herokuapp.com/peeps/" + peepId,
      {headers: {
        "Authorization": 'Token token=' + this.props.session
      }
    })
    .then(() => this.getPeeps())
  };


  putLike(peepId) {
    axios.put("https://chitter-backend-api.herokuapp.com/peeps/" + peepId + '/likes/' + this.props.userDetails.id,
      {},
      {headers: {
        "Authorization": 'Token token=' + this.props.session
      }
    })
    .then(() => this.getPeeps())
  };

  deleteLike(peepId) {
    axios.delete("https://chitter-backend-api.herokuapp.com/peeps/" + peepId + '/likes/' + this.props.userDetails.id,
      {headers: {
        "Authorization": 'Token token=' + this.props.session
      }
    })
    .then(() => this.getPeeps())
  };


  render() {
    const isLoggedIn = this.props.loggedIn
    const currentUser = this.props.userDetails
    const isLoaded = this.state.status === 'loaded';
    return(
      <>
        {isLoggedIn && <PeepForm postPeep={this.postPeep}/>}
        {isLoggedIn && isLoaded && <PeepContainer
          peeps={this.state.peeps}currentUser={currentUser}
          deletePeep={this.deletePeep}
          putLike={this.putLike} deleteLike={this.deleteLike} />}
      </>
    );
  };
};

export default PeepApiHandler;
