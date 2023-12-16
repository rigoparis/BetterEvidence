import React, {useState} from 'react';
import {Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {includes, without, map, find} from 'lodash';

import CheckBox from '@react-native-community/checkbox';

import ghostinfo from '../../../jsonInfo/ghostInfo.json';
import GhostInfoContainer from '../../GhostInfoContainer';

function GhostInfo() {
  const [selectedGhosts, setSelectedGhosts] = useState(map(ghostinfo, 'name'));
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onCheckBoxChange = (ghost) => {
    if (includes(selectedGhosts, ghost))
      return setSelectedGhosts(without(selectedGhosts, ghost));
    if (!includes(selectedGhosts, ghost))
      return setSelectedGhosts([...selectedGhosts, ghost]);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
              gap: 10,
            }}>
            {selectedGhosts.length === 0 && (
              <Text style={{color: '#C6CACE'}}>
                Please pick at least one ghost
              </Text>
            )}
            {selectedGhosts.length > 0 &&
              selectedGhosts.map((ghost, key) => (
                <GhostInfoContainer
                  ghost={find(ghostinfo, {name: ghost})}
                  key={key}
                />
              ))}
          </View>
        </ScrollView>
      </View>
      <Button
        style={styles.controlButton}
        title="Toggle filters"
        color="#446D92"
        accessibilityLabel="Toggle selection filters"
        onPress={() => setIsCollapsed(!isCollapsed)}
      />
      <Collapsible collapsed={isCollapsed}>
        <View>
          <View style={styles.buttonBanner}>
            <Button
              style={styles.controlButton}
              title="Select all"
              color="#446D92"
              accessibilityLabel="Select all ghosts"
              onPress={() => setSelectedGhosts(map(ghostinfo, 'name'))}
            />
            <Button
              style={styles.controlButton}
              title="Deselect all"
              color="#446D92"
              accessibilityLabel="Select all ghosts"
              onPress={() => setSelectedGhosts([])}
            />
          </View>
          <View style={styles.checkboxGroupContainer}>
            {ghostinfo.map((ghost, key) => (
              <View style={styles.checkboxInput} key={key}>
                <CheckBox
                  disabled={false}
                  tintColors={{true: '#446D92', false: '#C6CACE'}}
                  value={includes(selectedGhosts, ghost.name)}
                  onChange={() => onCheckBoxChange(ghost.name)}
                />
                <Text style={styles.checkboxLabel}>{ghost.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </Collapsible>
    </View>
  );
}

export default GhostInfo;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  checkboxGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  checkboxInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#C6CACE',
  },
  buttonBanner: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  controlButton: {
    alignSelf: 'stretch',
  },
});
