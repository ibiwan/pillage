import { connect } from 'react-redux'
// import { increment, decrement, reset } from './actionCreators'

// const Counter = ...

import App from './App'

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    // counter: state.counter,
  }
}

const mapDispatchToProps = {
  //  increment, decrement, reset 
  doBlah: () => ({type:"BLAH"})
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
