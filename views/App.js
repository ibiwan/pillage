import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  FlatList,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import useCached from '../hooks/useCached';

import AddIcon from './icons/AddIcon';
import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import SaveIcon from './icons/SaveIcon';

import styles from './styles';

import { MED_NAMES_KEY } from '../store/selectors';

export default function App({ getCached, setCached }) {
  const [editIndex, setEditIndex] = useState();
  // const [detailIndex, setDetailIndex] = useState();
  const [medNames, setMedNames, saveMedNames] = useCached(MED_NAMES_KEY, []);

  getCached(MED_NAMES_KEY, []);

  const handleMedNameUpdate = (i, val) => {
    const updatedNames = [...medNames];
    updatedNames[i] = val;
    setMedNames(updatedNames);
  };

  const addMedName = () => {
    setMedNames(
      [...medNames, ''],
      // then,
      saveMedNames
    );

    setCached(MED_NAMES_KEY);
  };

  const medButtonPressed = (i) => () => {
    console.log('see details for', { i });
    // doBlah();
  };

  const editButtonPressed = (i) => () => {
    if (editIndex !== null) {
      saveMedNames();
    }

    setEditIndex(i);
  };

  const saveButtonPressed = () => () => {
    saveMedNames();
    setEditIndex(null);
  };

  const deleteButtonPressed = (i) => () => {
    const newList = [...medNames.slice(0, i), ...medNames.slice(i + 1)];

    setMedNames(
      newList,
      // then,
      saveMedNames
    );
  };

  const medNameRenderItem = ({ item: medName, index }) => {
    if (index === medNames.length) {
      return <AddIcon onPress={addMedName} />;
    }

    return (
      <TouchableHighlight
        onPress={medButtonPressed(index)}
        disabled={editIndex === index}
      >
        <View style={styles.medItem}>
          {editIndex === index ? (
            <TextInput
              value={medName}
              onChangeText={(val) => handleMedNameUpdate(index, val)}
              onEndEditing={saveMedNames}
              style={styles.medNameField}
            />
          ) : (
            <Text style={styles.medNameField}>{`${medName}_`}</Text>
          )}
          {editIndex === index ? (
            <SaveIcon onPress={saveButtonPressed(index)} />
          ) : (
            <EditIcon onPress={editButtonPressed(index)} />
          )}
          <DeleteIcon onPress={deleteButtonPressed(index)} />
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
  getCached: PropTypes.func.isRequired,
  setCached: PropTypes.func.isRequired,
};
