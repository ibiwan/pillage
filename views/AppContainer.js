import { connect } from 'react-redux';

import {
  fetchMedNames as fetchMedNamesAction,
  addMedName as addMedNameAction,
  deleteMedName as deleteMedNameAction,
  editMedName as editMedNameAction,
} from '../store/actions/medNames';

import {
  getMedNames as getMedNamesSeleector,
} from '../store/selectors';

import App from './App';

const mapStateToProps = (state /* , ownProps */) => ({
  medNames: getMedNamesSeleector(state),
});

const mapDispatchToProps = {
  addMedName: addMedNameAction,
  deleteMedName: deleteMedNameAction,
  editMedName: editMedNameAction,
  fetchMedNames: fetchMedNamesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
