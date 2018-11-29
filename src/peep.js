import React, {Component} from 'react';

class Peep extends Component {
  render() {
    const {body, created_at, user } = this.props.data
    return(
      <div>
        <h2 className='peep-handle'>{user.handle}</h2>
        <h2 className='peep-body'>{body}</h2>
      </div>
    )
  }
}

export default Peep
