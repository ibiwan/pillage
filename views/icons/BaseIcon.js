import React from 'react';
import PropTypes from 'prop-types';

import { TouchableHighlight } from 'react-native';

import { Icon } from 'react-native-elements';

export default function BaseIcon(props) {
  const { onPress } = props;

  return (
    <TouchableHighlight onPress={onPress}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Icon {...props} color="#517fa4" />
    </TouchableHighlight>
  );
}

BaseIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
};
