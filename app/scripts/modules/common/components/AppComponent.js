import 'babel/polyfill';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    children: state.router.screen,
  })
)(App);
