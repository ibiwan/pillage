import { 
  useEffect, 
  useState,
} from 'react';

import { 
  AsyncStorage,
} from 'react-native';

const deepEqual = require("fast-deep-equal")

import useStateCallback from './useStateCallback'

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

    console.log("parsed", {fetchedVal, storedVal})

    if(!deepEqual(fetchedVal, storedVal)){
      console.log("setting stored", {fetchedVal})
      setStoredVal(fetchedVal);

      if(!deepEqual(storedVal, localVal)){
        console.log("setting local because differing", {fetchedVal})
        setLocalVal(fetchedVal);
      }
    }

    if(undefined === localVal){
      console.log("setting local because undefined", {fetchedVal})
      setLocalVal(storedVal);
    }
  }

  const saveChanges = async () => {
    console.log("attempting save", {storedVal, localVal})
    if(!deepEqual(storedVal, localVal)){
      console.log("saving to async", {localVal})
      await setItem(key, JSON.stringify(localVal))
      console.log("will fetch")
      await fetchStoredVal()
    }
  }

  useEffect( () => { 
    // use thunk to hide async-ness
    fetchStoredVal(); 
  } ); 

  return [localVal, setLocalVal, saveChanges];
}

export default useCached;