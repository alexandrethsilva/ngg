import 'babel/polyfill';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  state => ({
    children: state.router.screen
  })
)(App);
