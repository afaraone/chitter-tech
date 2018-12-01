import React, {Component} from 'react';
import Peep from './peep'

class PeepContainer extends Component {
  render() {
    const peeps = this.props.peeps
    return(
      <div className='peep-timeline'>
        {peeps.map(peep => <Peep data={peep} key={peep.id}/>)}
      </div>
    )
  }
}
// this.state.peeps.map(peep => <Peep data={peep} key={peep.id}/>)

export default PeepContainer;
