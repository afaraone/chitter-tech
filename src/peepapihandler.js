import React, {Component} from 'react';
import PeepContainer from './peepcontainer';
import axios from 'axios';

class PeepApiHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { peeps: [], status: 'loading' };
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
    let data = {"user_id": this.props.userDetails.userId, "body": body}
    axios.post("https://chitter-backend-api.herokuapp.com/peeps",
      {peep: data},
      {headers: {
        "content-type": "application/json",
        "Authorization": 'Token token=' + this.props.session
      }
    })
    .then(() => this.getPeeps())
    .catch(() => console.log('error'))
  }

  render() {
    const isLoaded = this.state.status === 'loaded';
    return(
      <>
        {isLoaded && <PeepContainer peeps={this.state.peeps}/>}
      </>
    );
  };
};

export default PeepApiHandler;
