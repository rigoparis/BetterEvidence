import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Linking,
  Button,
} from 'react-native';
import React, {useMemo, useState, useCallback} from 'react';
import {Picker} from '@react-native-picker/picker';

//import maps
import RidgeviewCourtMap from '../maps/RidgeviewCourtMap';
import WillowStreetMap from '../maps/WillowStreetMap';
import EdgefieldRoadMap from '../maps/EdgefieldRoadMap';
import TanglewoodDriveMap from '../maps/TanglewoodDriveMap';
import BleasdaleFarmhouseMap from '../maps/BleasdaleFarmhouseMap';
import BrownstoneHighSchoolMap from '../maps/BrownstoneHighSchoolMap';
import CampWoodwindMap from '../maps/CampWoodwindMap';
import GraftonFarmhouseMap from '../maps/GraftonFarmhouseMap';
import MapleLodgeCampsiteMap from '../maps/MapleLodgeCampsiteMap';
import PrisonMap from '../maps/PrisonMap';
import SunnyMeadowsMentalInstitutionMap from '../maps/SunnyMeadowsMentalInstitutionMap';

// 13 Willow Street
// 42 Edgefield Road
// 6 Tanglewood Drive
// Bleasdale Farmhouse
// Brownstone High School
// Camp Woodwind
// Grafton Farmhouse
// Maple Lodge Campsite
// Prison
// Sunny Meadows Mental Institution

const MAPINDEX = [
  {
    label: '10 Ridgeview Court',
    Map: RidgeviewCourtMap,
  },
  {
    label: '13 Willow Street',
    Map: WillowStreetMap,
  },
  {
    label: '42 Edgefield Road',
    Map: EdgefieldRoadMap,
  },
  {
    label: '6 Tanglewood Drive',
    Map: TanglewoodDriveMap,
  },
  {
    label: 'Bleasdale Farmhouse',
    Map: BleasdaleFarmhouseMap,
  },
  {
    label: 'Brownstone High School',
    Map: BrownstoneHighSchoolMap,
  },
  {
    label: 'Camp Woodwind',
    Map: CampWoodwindMap,
  },
  {
    label: 'Grafton Farmhouse',
    Map: GraftonFarmhouseMap,
  },
  {
    label: 'Maple Lodge Campsite',
    Map: MapleLodgeCampsiteMap,
  },
  {
    label: 'Prison',
    Map: PrisonMap,
  },
  {
    label: 'Sunny Meadows Mental Institution',
    Map: SunnyMeadowsMentalInstitutionMap,
  },
];

const MapsScreen = () => {
  const [selectedMap, setSelectedMap] = useState(MAPINDEX[0].label);
  const Map = useMemo(
    () => MAPINDEX.find((i) => i.label === selectedMap).Map,
    [selectedMap],
  );

  const handlePress = useCallback(async () => {
    const url = 'https://phasmo.karotte.org/';
    Linking.openURL(url);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Map />
      </View>
      <View style={styles.redirectContainer}>
        <Text style={styles.redirectText}>Maps extracted from </Text>
        <Button
          color="#000"
          title="phasmo.karotte.org"
          style={{textDecoration: 'underline'}}
          onPress={handlePress}></Button>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerHeader}>Pick a map:</Text>
        <Picker
          selectedValue={selectedMap}
          style={styles.picker}
          dropdownIconColor="#FFF"
          prompt="Select a map..."
          onValueChange={(itemValue, itemIndex) => setSelectedMap(itemValue)}>
          {MAPINDEX.map((i, key) => (
            <Picker.Item label={i.label} value={i.label} key={key} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default MapsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  pickerContainer: {
    backgroundColor: '#0A0C0F',
  },
  pickerHeader: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 6,
  },
  picker: {
    color: '#FFF',
  },
  redirectContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  redirectText: {
    color: '#FFF',
  },
});
