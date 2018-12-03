import React, {Component} from 'react';

class Peep extends Component {
  format_date(date) {
    let d = new Date(date)
    return d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + '/' + (d.getMonth() + 1)  + '/' + d.getFullYear()
  }

  render() {
    const {body, id, created_at, user, likes } = this.props.data
    const date = this.format_date(created_at)
    return(
      <div>
        <h2 className='peep-handle'>{user.handle}</h2>
        <h2 className='peep-body'>{body}</h2>
        <h2 className='peep-date'>{date}</h2>
        <h2 className='peep-likes'>{likes.length} Likes</h2>
        <button className='like-button' onClick={() => this.props.postLike(id) }>Like</button>
      </div>
    )
  }
}

export default Peep
