import React, {Component} from 'react';
import Peep from './peep'
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

  render() {
    const isLoaded = this.state.status === 'loaded'
    const peeps = this.state.peeps.map(peep => <Peep data={peep} key={peep.id}/>)
    return(
      <div className='peep-timeline'>
        {isLoaded && peeps}
      </div>
    );
  };
};

export default PeepApiHandler;
