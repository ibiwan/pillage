import { connect } from 'react-redux'

import { createBlah } from '../store/actions';


import App from './App'

const mapStateToProps = (state /*, ownProps*/) => {
  return {

  }
}

const mapDispatchToProps = {
  doBlah: createBlah
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
