import { StatusBar } from 'expo-status-bar';

import React, { useEffect,
  // useEffect,
  useState } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

// import useCached from '../hooks/useCached';

import AddIcon from './icons/AddIcon';
import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import SaveIcon from './icons/SaveIcon';

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

  const handleMedNameUpdate = (val) => {
    setEdit({ ...edit, val });
  };

  const handleAddMedName = () => {
    // console.log('handleAddMedName');
    addMedName();
  };

  const handleMedButtonPressed = (i) => () => {
    console.log('see details for', { i });
  };

  const saveMedName = () => {
    if (edit.index !== null) {
      editMedName(edit.index, edit.val);
      setEdit({ index: null, val: null });
    }
  };

  const handleEditButtonPressed = (i) => () => {
    console.log('I would like to edit, now', { i });
    if (edit.index !== null) {
      saveMedName();
    }

    setEdit({ index: i, val: medNames[i] });
  };

  const handleSaveButtonPressed = () => () => {
    console.log('I would like to save, now');
    saveMedName();
  };

  const handleDeleteButtonPressed = (i) => () => {
    console.log('I would like to delete, now', { i });

    deleteMedName(i);
  };

  const medNameRenderItem = ({ item: medName, index }) => {
    if (index === medNames.length) {
      return <AddIcon onPress={handleAddMedName} />;
    }

    return (
      <TouchableHighlight
        onPress={handleMedButtonPressed(index)}
        disabled={edit.index === index}
      >
        <View style={styles.medItem}>
          {edit.index === index ? (
            <TextInput
              value={medName}
              onChangeText={(val) => handleMedNameUpdate(index, val)}
              // onEndEditing={saveMedNames}
              style={styles.medNameField}
            />
          ) : (
            <Text style={styles.medNameField}>{`${medName}_`}</Text>
          )}
          {edit.index === index ? (
            <SaveIcon onPress={handleSaveButtonPressed()} />
          ) : (
            <EditIcon onPress={handleEditButtonPressed(index)} />
          )}
          <DeleteIcon onPress={handleDeleteButtonPressed(index)} />
        </View>
      </TouchableHighlight>
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
  medNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchMedNames: PropTypes.func.isRequired,
  addMedName: PropTypes.func.isRequired,
  deleteMedName: PropTypes.func.isRequired,
  editMedName: PropTypes.func.isRequired,
};
