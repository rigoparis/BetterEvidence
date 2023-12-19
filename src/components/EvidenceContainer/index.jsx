import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';

import Icon from '../../assets/evidenceImages/Icon';

const EvidenceContainer = ({evidence, selected, rejected, disabled}) => {
  return (
    <View>
      <View
        style={[
          styles.box,
          !disabled && selected ? styles.selected : '',
          !disabled && rejected ? styles.rejected : '',
          disabled ? styles.disabled : '',
        ]}>
        <View style={styles.iconContainer}>
          <Icon keyword={evidence.keyword} size={60} />
        </View>
        <Text
          style={[
            styles.evidenceName,
            !disabled && selected ? styles.selectedText : '',
            !disabled && rejected ? styles.rejectedText : '',
            disabled ? styles.disabledText : '',
          ]}>
          {evidence.name}
        </Text>
      </View>
    </View>
  );
};

export default EvidenceContainer;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#666666',
    borderWidth: 4,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  selected: {
    borderColor: '#347d2e',
    backgroundColor: '#4bb543',
  },
  selectedText: {
    backgroundColor: '#347d2e',
  },
  rejected: {
    borderColor: '#e60000',
    backgroundColor: '#ff3333',
  },
  rejectedText: {
    backgroundColor: '#e60000',
  },
  disabled: {
    borderColor: '#666',
    backgroundColor: '#999',
  },
  disabledText: {
    backgroundColor: '#666',
  },
  evidenceName: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#000000c0',
    width: '100%',
    textAlignVertical: 'center',
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  iconContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
