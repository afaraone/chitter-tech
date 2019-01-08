import React, {Component} from 'react';

class PeepForm extends Component {
  constructor(props) {
    super(props);
    this.state = { body: '' };
    this.updateBody = this.updateBody.bind(this);
  };

  updateBody(input) {
    this.setState({
      body: input.target.value
    });
  };

  render() {
    const body = this.state.body
    return(
      <div className='post-peep-container'>
      <input type='text' id='peep-textbox' placeholder='Type Message' onChange={this.updateBody}/>
      <button id='post-peep' onClick={() => this.props.postPeep(body)}>Post</button>
      </div>
    )
  }
};

export default PeepForm;
