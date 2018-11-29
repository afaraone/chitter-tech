import React, {Component} from 'react';
import axios from 'axios';

class PeepApiHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { peeps: [], status: 'loading' };
  };

  getPeeps() {
    axios.get("https://chitter-backend-api.herokuapp.com/peeps")
    .then(res => this.setState({peeps: res.data, status: 'loaded' }))
    .catch(err => console.log(err));
  };
  render() {
    return(
      <div className='peep-list'>
      </div>
    );
  }
};

export default PeepApiHandler;
