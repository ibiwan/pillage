import React from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import DeleteIcon from './icons/DeleteIcon';
import EditIcon from './icons/EditIcon';
import SaveIcon from './icons/SaveIcon';

import styles from './styles';

export default function MedNamesItem({
  medName,
  index,
  edit,

  setEdit,
  saveMedName,
  deleteMedName,
  handleEditButtonPressed,
  handleMedDetailButtonPressed,
}) {
  return (
    <TouchableHighlight
      onPress={handleMedDetailButtonPressed(index)}
      disabled={edit.index === index}
    >
      <View style={styles.medItem}>
        {edit.index === index ? (
          <TextInput
            value={edit.val}
            onChangeText={(val) => setEdit({ ...edit, val })}
            style={styles.medNameField}
          />
        ) : (
          <Text style={styles.medNameField}>{`${medName}_`}</Text>
        )}
        {edit.index === index ? (
          <SaveIcon onPress={() => saveMedName()} />
        ) : (
          <EditIcon onPress={handleEditButtonPressed(index)} />
        )}
        <DeleteIcon onPress={() => deleteMedName(index)} />
      </View>
    </TouchableHighlight>
  );
}

MedNamesItem.propTypes = {
  medName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  edit: PropTypes.shape({ index: PropTypes.number, val: PropTypes.string }).isRequired,
  handleMedDetailButtonPressed: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  saveMedName: PropTypes.func.isRequired,
  handleEditButtonPressed: PropTypes.func.isRequired,
  deleteMedName: PropTypes.func.isRequired,
};
