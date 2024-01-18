import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Accordion from 'react-native-collapsible/Accordion';
import BannerAdContainer from '../../BannerAdContainer';
import {BannerAdSize} from 'react-native-google-mobile-ads';

import evidenceInfo from '../../../jsonInfo/evidenceInfo.json';
import {map, values} from 'lodash';

const starterEquipment = map(evidenceInfo.starterEquipment.equipment, (e) => {
  return {
    title: e.equipName,
    content: {use: e.use, storeInfo: e.storeInfo, maxLimit: e.maxLimit},
  };
});

const optionalEquipment = map(evidenceInfo.optionalEquipment.equipment, (e) => {
  return {
    title: e.equipName,
    content: {use: e.use, storeInfo: e.storeInfo, maxLimit: e.maxLimit},
  };
});

const vanEquipment = map(evidenceInfo.vanEquipment.equipment, (e) => {
  return {
    title: e.equipName,
    content: {use: e.use},
  };
});

const renderHeader = (section) => {
  return (
    <View style={styles.header}>
      <Text style={styles.equipName}>{section.title}</Text>
    </View>
  );
};

const renderStarterContent = ({content}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.contentSubheader}>Use</Text>
      <Text style={styles.contentText}>{content.use}</Text>
      <Text style={styles.contentSubheader}>
        Maximum limit per investigation
      </Text>
      <Text style={styles.contentText}>{content.maxLimit}</Text>
      <Text style={styles.contentSubheader}>Cost per unit</Text>
      <Text style={styles.contentText}>{content.storeInfo.cost}</Text>
      <Text style={styles.contentSubheader}>Tiers</Text>
      <View style={styles.tierContainer}>
        <Text style={styles.categoryHeader}>Tier 1</Text>
        {content.storeInfo.t1req.level !== 0 ? (
          <View style={styles.tierContainer}>
            <Text style={styles.categoryInformationSubheader}>Level</Text>
            <Text style={styles.contentText}>
              {content.storeInfo.t1req.level}
            </Text>
            <Text style={styles.categoryInformationSubheader}>Update Cost</Text>
            <Text style={styles.contentText}>
              {content.storeInfo.t1req.upgradeCost.toLocaleString()}
            </Text>
          </View>
        ) : (
          <Text style={styles.contentText}>Default Item</Text>
        )}
        {content.storeInfo.t1req.consumable && (
          <View style={styles.tierContainer}>
            <Text style={styles.categoryInformationSubheader}>Consumable</Text>
            <Text style={styles.contentText}>Yes</Text>
          </View>
        )}
      </View>
      <View style={styles.tierContainer}>
        <Text style={styles.categoryHeader}>Tier 2</Text>
        <View style={styles.tierContainer}>
          <Text style={styles.categoryInformationSubheader}>Level</Text>
          <Text style={styles.contentText}>
            {content.storeInfo.t2req.level}
          </Text>
          <Text style={styles.categoryInformationSubheader}>Update Cost</Text>
          <Text style={styles.contentText}>
            {content.storeInfo.t2req.upgradeCost.toLocaleString()}
          </Text>
          {content.storeInfo.t2req.consumable && (
            <View>
              <Text style={styles.categoryInformationSubheader}>
                Consumable
              </Text>
              <Text style={styles.contentText}>Yes</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.tierContainer}>
        <Text style={styles.categoryHeader}>Tier 3</Text>
        <View style={styles.tierContainer}>
          <Text style={styles.categoryInformationSubheader}>Level</Text>
          <Text style={styles.contentText}>
            {content.storeInfo.t3req.level}
          </Text>
          <Text style={styles.categoryInformationSubheader}>Update Cost</Text>
          <Text style={styles.contentText}>
            {content.storeInfo.t3req.upgradeCost.toLocaleString()}
          </Text>
          {content.storeInfo.t3req.consumable && (
            <View>
              <Text style={styles.categoryInformationSubheader}>
                Consumable
              </Text>
              <Text style={styles.contentText}>Yes</Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          marginVertical: 20,
          display: 'flex',
          alignItems: 'center',
        }}>
        <BannerAdContainer bannerSize={BannerAdSize.MEDIUM_RECTANGLE} />
      </View>
    </View>
  );
};

const renderVanContent = ({content}) => (
  <View style={styles.content}>
    <Text style={styles.contentSubheader}>Use</Text>
    <Text style={styles.contentText}>{content.use}</Text>
  </View>
);

function GearInfo() {
  const [activeStarterSections, setActiveStarterSections] = useState([]);
  const [activeOptionalSections, setActiveOptionalSections] = useState([]);
  const [activeVanSections, setActiveVanSections] = useState([]);
  const updateStarterSections = (activeSections) => {
    setActiveStarterSections(activeSections);
  };
  const updateOptionalSections = (activeSections) => {
    setActiveOptionalSections(activeSections);
  };
  const updateVanSections = (activeSections) => {
    setActiveVanSections(activeSections);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.accordionTitleContainer}>
        <Text style={styles.accordionTitle}>Touch to expand</Text>
      </View>
      <View>
        <Text style={styles.headerText}>Starting Equipment</Text>
        <Accordion
          activeSections={activeStarterSections}
          sections={starterEquipment}
          touchableComponent={TouchableOpacity}
          expandMultiple={true}
          renderHeader={renderHeader}
          renderContent={renderStarterContent}
          onChange={updateStarterSections}
        />
      </View>
      <View>
        <Text style={styles.headerText}>Optional Equipment</Text>
        <Accordion
          activeSections={activeOptionalSections}
          sections={optionalEquipment}
          touchableComponent={TouchableOpacity}
          expandMultiple={true}
          renderHeader={renderHeader}
          renderContent={renderStarterContent}
          onChange={updateOptionalSections}
        />
      </View>
      <View>
        <Text style={styles.headerText}>Van Equipment</Text>
        <Accordion
          activeSections={activeVanSections}
          sections={vanEquipment}
          touchableComponent={TouchableOpacity}
          expandMultiple={true}
          renderHeader={renderHeader}
          renderContent={renderVanContent}
          onChange={updateVanSections}
        />
      </View>
    </ScrollView>
  );
}

export default GearInfo;

const styles = StyleSheet.create({
  container: {backgroundColor: '#000', height: '100%'},
  equipContainer: {marginLeft: 10, marginBottom: 40},
  tierContainer: {marginLeft: 20},
  tierInfoContainer: {marginLeft: 30},
  content: {marginHorizontal: 30, paddingVertical: 10},
  contentText: {fontSize: RFValue(16), color: '#C6CACE', marginLeft: 10},
  accordionTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  accordionTitle: {
    color: '#446D92',
    fontSize: RFValue(14),
    marginTop: 20,
    fontFamily: 'PermanentMarker-Regular',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderColor: '#446D92',
    borderWidth: 1.0,
    borderStyle: 'solid',
    paddingVertical: 5,
  },
  headerText: {
    color: '#446D92',
    fontSize: RFValue(28),
    marginVertical: 20,
    fontFamily: 'PermanentMarker-Regular',
    textAlign: 'center',
  },
  equipName: {
    color: '#C6CACE',
    fontSize: RFValue(26),
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  contentSubheader: {
    color: '#446D92',
    fontSize: RFValue(20),
  },
  categoryHeader: {color: '#698aa7', fontSize: 18},
  categoryInformationSubheader: {
    color: '#8ea7bd',
    fontSize: RFValue(16),
    textDecorationLine: 'underline',
  },
});
