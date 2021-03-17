import { StatusBar } from 'expo-status-bar';

import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
  Text,
  View,
} from 'react-native';

import MedNamesItem from './MedNamesItem';
import AddIcon from './icons/AddIcon';
import styles from './styles';

export default function App({
  medNames,
  fetchMedNames,
  addMedName,
  editMedName,
  deleteMedName,
}) {
  useEffect(() => {
    fetchMedNames();
  }, [fetchMedNames]);

  const [edit, setEdit] = useState({ index: null, val: null });
  // const [detailIndex, setDetailIndex] = useState();

  const saveMedName = () => {
    if (edit.index !== null) {
      editMedName(edit.index, edit.val);
      setEdit({ index: null, val: null });
    }
  };

  const handleMedDetailButtonPressed = (i) => () => {
    console.log('see details for', { i });
  };

  const handleAddMedName = () => {
    saveMedName();
    addMedName();
    setEdit({ index: medNames.length, val: '' });
  };

  const handleEditButtonPressed = (i) => () => {
    if (edit.index !== null) {
      saveMedName();
    }

    setEdit({ index: i, val: medNames[i].name });
  };

  const medNameRenderItem = ({ item: medName, index }) => {
    if (index === medNames.length) {
      return <AddIcon onPress={handleAddMedName} />;
    }

    return (
      <MedNamesItem
        edit={edit}
        index={index}
        medName={medName.name}
        setEdit={setEdit}
        saveMedName={saveMedName}
        deleteMedName={deleteMedName}
        handleEditButtonPressed={handleEditButtonPressed}
        handleMedDetailButtonPressed={handleMedDetailButtonPressed}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Med Names</Text>
      {medNames && (
        <FlatList
          data={[...medNames, ''] ?? ['']}
          renderItem={medNameRenderItem}
          keyExtractor={(item, i) => `${i}`}
          style={styles.medList}
        />
      )}
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </View>
  );
}

App.propTypes = {
  medNames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  fetchMedNames: PropTypes.func.isRequired,
  addMedName: PropTypes.func.isRequired,
  deleteMedName: PropTypes.func.isRequired,
  editMedName: PropTypes.func.isRequired,
};
