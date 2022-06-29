import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    return (<div data-testid="feedback-text">Feedback Page</div>);
  }
}

export default connect()(Feedback);
