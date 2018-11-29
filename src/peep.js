import React, {Component} from 'react';

class Peep extends Component {
  format_date(date) {
    let d = new Date(date)
    return d.getHours() + ":" + d.getMinutes() + " " + d.toLocaleDateString()
  }

  render() {
    const {body, created_at, user, likes } = this.props.data
    const date = this.format_date(created_at)
    return(
      <div>
        <h2 className='peep-handle'>{user.handle}</h2>
        <h2 className='peep-body'>{body}</h2>
        <h2 className='peep-date'>{date}</h2>
        <h2 className='peep-likes'>{likes.length} Likes</h2>
      </div>
    )
  }
}

export default Peep
