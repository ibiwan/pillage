import { StatusBar } from 'expo-status-bar';

import React, { 
  useState,
} from 'react';

import { 
  FlatList,
  Text, 
  TextInput,
  TouchableHighlight,
  View, 
} from 'react-native';

import useCached from '../hooks/useCached'

import AddIcon from './icons/AddIcon'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import SaveIcon from './icons/SaveIcon'

import styles from './styles'

const MED_NAMES_KEY = 'medNames';

export default function App({ doBlah }) {
  console.log("\n\n");
  console.log("start rendering")

  const [editIndex, setEditIndex] = useState();
  const [detailIndex, setDetailIndex] = useState();
  const [medNames, setMedNames, saveMedNames] = useCached(MED_NAMES_KEY, []);


  const handleMedNameUpdate = (i, val) => {
    const updatedNames = [...medNames];
    updatedNames[i] = val;
    console.log("setting updated", {i, val, updatedNames})
    setMedNames(updatedNames);
  }

  const addMedName = () => {
    console.log("adding new to mednames")
    setMedNames(
      [...medNames, ''], 
      // then,
      saveMedNames
    );
  }

  const medButtonPressed = (i) => () => {
    console.log("see details for", {i})
    doBlah();
  }

  const editButtonPressed = (i) => () => {
    if(editIndex !== null){
      console.log("saving med names")
      saveMedNames()
    }
    
    console.log("switching to edit item", {i})
    setEditIndex(i)
  };

  const saveButtonPressed = (i) => () => {
    console.log("saving")
    saveMedNames();
    console.log("clearing edit mode")
    setEditIndex(null);
  }

  const deleteButtonPressed = (i) => () => {
    console.log("deleting an item, then should call save", {i})
    const newList = [
      ...medNames.slice(0, i),
      ...medNames.slice(i+1),
    ]
    console.log("setting", {newList})
    setMedNames(
      newList,
      // then,
      saveMedNames
    );
  }

  const medNameRenderItem = ({item: medName, index}) => {
    if (index === medNames.length) {
      return <AddIcon onPress={addMedName} />
    }

    return (
      <TouchableHighlight
        onPress={medButtonPressed(index)}
        disabled={editIndex===index}
      >
        <View 
          style={styles.medItem}
        >
          {(editIndex===index) 
            ? <TextInput 
                value={medName} 
                onChangeText={(val) => handleMedNameUpdate(index, val)}
                onEndEditing={saveMedNames}
                style={styles.medNameField}
              />
            : <Text 
                style={styles.medNameField}
              >
                {medName + '_'}
              </Text>
          }
          {(editIndex === index) 
            ? <SaveIcon onPress={saveButtonPressed(index)} /> 
            : <EditIcon onPress={editButtonPressed(index)} />}
          <DeleteIcon onPress={deleteButtonPressed(index)} /> 

        </View>
      </TouchableHighlight>  
    );
  }

  console.log("rendering to return\n")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Med Names
      </Text>
      {medNames && (
        <FlatList
          data={[...medNames, ''] ?? ['']}
          renderItem={medNameRenderItem}
          keyExtractor={(item, i) => `${i}`}
          style={styles.medList}
        ></FlatList>
      )}
      <StatusBar 
        style="auto" 
      />
    </View>
  );
}
