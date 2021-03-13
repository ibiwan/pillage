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
    if(!deepEqual(storedVal, localVal)){
      await setItem(key, JSON.stringify(localVal))
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