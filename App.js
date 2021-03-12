import { StatusBar } from 'expo-status-bar';

import React, { 
  useEffect, 
  useState,
} from 'react';

import { 
  AsyncStorage,
  FlatList,
  Text, 
  TextInput,
  TouchableHighlight,
  View, 
} from 'react-native';

import useStateCallback from './useStateCallback'

import AddIcon from './icons/AddIcon'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import SaveIcon from './icons/SaveIcon'

import styles from './styles'

const deepEqual = require("fast-deep-equal")

const MED_NAMES_KEY = 'medNames';

const {
  setItem, 
  getItem
} = AsyncStorage;

const useCached = (key, defaultValue = null) => {
  const [storedVal, setStoredVal] = useState(defaultValue);
  const [localVal, setLocalVal] = useStateCallback();

  const fetchStoredVal = async () => {
    const storedRaw = await getItem(key);
    const fetchedVal = JSON.parse(storedRaw);

    if(!deepEqual(fetchedVal, storedVal)){
      setStoredVal(fetchedVal);

      if(!deepEqual(storedVal, localVal)){
        setLocalVal(fetchedVal);
      }
    }

    if(undefined === localVal){
      setLocalVal(storedVal);
    }
  }

  const saveChanges = async () => {
    console.log("SAVING")
    if(!deepEqual(storedVal, localVal)){
      await setItem(key, JSON.stringify(localVal))
      await fetchStoredVal()
    }
  }

  useEffect( () => { fetchStoredVal(); } ); // use thunk to hide asyncness

  return [localVal, setLocalVal, saveChanges];
}

export default function App() {
  const [editIndex, setEditIndex] = useState();
  const [detailIndex, setDetailIndex] = useState();
  const [medNames, setMedNames, saveMedNames] = useCached(MED_NAMES_KEY, []);


  const handleMedNameUpdate = (i, val) => {
    const updatedNames = [...medNames];
    updatedNames[i] = val;
    setMedNames(updatedNames);
  }

  const addMedName = () => {
    setMedNames(
      [...medNames,''], 
      // then,
      saveMedNames
    );
  }

  const medButtonPressed = (i) => () => {
    console.log("see details for", {i})
  }

  const editButtonPressed = (i) => () => {
    if(editIndex !== null){
      saveMedNames()
    }
    
    setEditIndex(i)
  };

  const saveButtonPressed = (i) => () => {
    saveMedNames();
    setEditIndex(null);
  }

  const deleteButtonPressed = (i) => () => {
    setMedNames(
      [
        ...medNames.slice(0, i),
        ...medNames.slice(i+1),
      ],
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
