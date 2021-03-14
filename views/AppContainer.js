import { connect } from 'react-redux';

import { getCached, setCached } from '../store/actions';

import { MED_NAMES_KEY, getMedNames } from '../store/selectors';

import App from './App';

const mapStateToProps = (state /* , ownProps */) => ({
  [MED_NAMES_KEY]: getMedNames(state),
});

const mapDispatchToProps = {
  getCached,
  setCached,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
