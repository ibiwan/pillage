import React from 'react';

import {
  TouchableHighlight,
} from 'react-native';

import { 
  Icon,
} from 'react-native-elements';

export default (props) => {
  const {onPress} = props;

  return (
    <TouchableHighlight
      onPress={onPress}
    > 
      <Icon
        {...props}
        color='#517fa4'
      />
    </TouchableHighlight>
  )
}
