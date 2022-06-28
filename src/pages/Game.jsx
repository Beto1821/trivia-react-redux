import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (<div>Game Page</div>);
  }
}

export default connect()(Game);
