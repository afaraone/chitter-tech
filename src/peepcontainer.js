import React, {Component} from 'react';
import Peep from './peep'

class PeepContainer extends Component {
  render() {
    const peeps = this.props.peeps
    const currentUser = this.props.currentUser
    return(
      <div className='peep-timeline'>
        {peeps.map(peep => <Peep
            data={peep} putLike={this.props.putLike} deleteLike={this.props.deleteLike} currentUser={currentUser} key={peep.id}
          />)}
      </div>
    )
  }
}

export default PeepContainer;
