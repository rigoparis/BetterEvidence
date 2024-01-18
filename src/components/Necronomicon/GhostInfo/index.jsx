import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BannerAdSize} from 'react-native-google-mobile-ads';
import Collapsible from 'react-native-collapsible';
import {includes, without, map, filter, chain} from 'lodash';

import CheckBox from '@react-native-community/checkbox';

import ghostinfo from '../../../jsonInfo/ghostInfo.json';
import GhostInfoContainer from '../../GhostInfoContainer';
import BannerAdContainer from '../../BannerAdContainer';

function GhostInfo() {
  const [selectedGhosts, setSelectedGhosts] = useState(
    chain(ghostinfo).take(5).value(),
  );
  const [isCollapsed, setIsCollapsed] = useState(true);

  const onCheckBoxChange = (ghost) => () => {
    if (includes(selectedGhosts, ghost)) {
      return setSelectedGhosts(
        filter(ghostinfo, (i) => includes(without(selectedGhosts, ghost), i)),
      );
    }
    if (!includes(selectedGhosts, ghost))
      return setSelectedGhosts(
        filter(ghostinfo, (i) => includes([...selectedGhosts, ghost], i)),
      );
  };

  console.log('selectedGhosts: ', map(selectedGhosts, 'name'));

  return (
    <FlatList
      data={selectedGhosts}
      style={{backgroundColor: '#2e2f31'}}
      contentContainerStyle={{justifyContent: 'center'}}
      initialNumToRender={5}
      renderItem={({item, index}) => (
        <View
          style={{
            paddingTop: 15,
            paddingHorizontal: 20,
            backgroundColor: '#2e2f31',
          }}>
          <GhostInfoContainer ghost={item} />
          {(index + 1) % 3 === 0 && (
            <View
              style={{
                backgroundColor: '#2e2f31',
                marginTop: 10,
                marginRight: 'auto',
                marginLeft: 'auto',
              }}>
              <BannerAdContainer bannerSize={BannerAdSize.MEDIUM_RECTANGLE} />
            </View>
          )}
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.container}>
          <Button
            style={styles.controlButton}
            title="Toggle filters"
            color="#446D92"
            accessibilityLabel="Toggle selection filters"
            onPress={() => setIsCollapsed(!isCollapsed)}
          />
          <Collapsible collapsed={isCollapsed}>
            <View style={styles.filterContainer}>
              <View style={styles.buttonBanner}>
                <Button
                  style={styles.controlButton}
                  title="Select all"
                  color="#446D92"
                  accessibilityLabel="Select all ghosts"
                  onPress={() => setSelectedGhosts(ghostinfo)}
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
                  <TouchableOpacity
                    style={styles.checkboxInput}
                    key={key}
                    onPress={onCheckBoxChange(ghost)}>
                    <CheckBox
                      disabled
                      tintColors={{true: '#446D92', false: '#C6CACE'}}
                      value={includes(selectedGhosts, ghost)}
                    />
                    <Text style={styles.checkboxLabel}>{ghost.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Collapsible>
        </View>
      }
      ListEmptyComponent={
        <Text
          style={{
            color: '#C6CACE',
            fontSize: RFValue(20),
            fontFamily: 'ShadowsIntoLight-Regular',
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Please pick at least one ghost
        </Text>
      }
      stickyHeaderIndices={[0]}
    />
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
    marginVertical: 10,
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
    backgroundColor: '#000',
  },
  filterContainer: {
    backgroundColor: '#000',
  },
  controlButton: {
    alignSelf: 'stretch',
  },
});
