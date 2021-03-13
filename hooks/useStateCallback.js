import { 
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

function useStateCallback(initialState){
  const [state, _setState] = useState(initialState);
  console.log('useStateCallback FOB', {state})

  const callbackRef = useRef();
  const isFirstCallbackCall = useRef(true);

  const setState = useCallback(
    (setStateAction, callback) => {
      console.log("setting callback and calling real setState")
      callbackRef.current = callback;
      _setState(setStateAction);
    }, 
    []
  );

  useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false;
      return;
    }

    if(callbackRef.current){
      console.log("calling callback")
      callbackRef.current(state);
      callbackRef.current=null
    }
  }, [state]);

  return [state, setState];
}

export default useStateCallback;
