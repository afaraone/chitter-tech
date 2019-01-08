import React, {Component} from 'react';

class Peep extends Component {
  format_date(date) {
    let d = new Date(date)
    return d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + '/' + (d.getMonth() + 1)  + '/' + d.getFullYear()
  }

  likedByUser() {
    let currentUser = this.props.currentUser
    let likes = this.props.data.likes
    return likes.some(like => like.user.id === currentUser.id)
  }

  writtenByUser() {
    let currentUser = this.props.currentUser
    let author = this.props.data.user
    return author.id === currentUser.id
  }

  render() {
    const {body, id, created_at, user, likes } = this.props.data
    const date = this.format_date(created_at)
    const likedByUser = this.likedByUser()
    const writtenByUser = this.writtenByUser()
    return(
      <div className='peep-box'>
        <h2 className='peep-handle'>{user.handle}</h2>
        <h2 className='peep-body'>{body}</h2>
        <h2 className='peep-date'>{date}</h2>
        <h2 className='peep-likes'>{likes.length} Likes</h2>
        {!likedByUser &&
          <button className='like-button' onClick={() => this.props.putLike(id) }>Like</button>
        }
        {likedByUser &&
          <button className='unlike-button' onClick={() => this.props.deleteLike(id) }>Unlike</button>
        }
        {writtenByUser &&
          <button className='delete-button' onClick={() => this.props.deletePeep(id) }>Delete</button>
        }
      </div>
    )
  }
}

export default Peep
