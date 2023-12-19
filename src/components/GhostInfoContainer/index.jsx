import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

import evidenceInfo from '../../jsonInfo/evidenceInfo.json';
import {find} from 'lodash';
import Icon from '../../assets/evidenceImages/Icon';

const GhostInfoContainer = ({ghost}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.line, styles.header]}>
        <View>
          <Text style={styles.ghostName}>{ghost.name}</Text>
          <Text style={styles.evidenceLineText}>
            Sanity threshold: {ghost.sanityThreshold}
            {'%'}
            {ghost.sanityThresholdNote ? ' *' : ''}
          </Text>
          <Text style={styles.evidenceLineText}>
            Speed: {ghost.footstepSpeed} m/s
          </Text>
        </View>
        <View style={styles.evidenceContainer}>
          {ghost.evidence.map((evidence, key) => (
            <View key={key} style={styles.evidenceLine}>
              <Text style={styles.evidenceLineText}>
                {
                  find(evidenceInfo.starterEquipment.equipment, {
                    keyword: evidence,
                  }).name
                }
              </Text>
              <Icon keyword={evidence} size={25} />
            </View>
          ))}
        </View>
      </View>
      {ghost.strengths.length > 0 ? (
        <AtributeContainer
          mainAtribute="Strengths"
          atributeList={ghost.strengths}
        />
      ) : (
        <Text style={[styles.line, styles.atributeName]}>No strengths</Text>
      )}
      {ghost.weaknesses.length > 0 ? (
        <AtributeContainer
          mainAtribute="Weakness(es)"
          atributeList={ghost.weaknesses}
        />
      ) : (
        <Text style={[styles.line, styles.atributeName]}>
          {'No weakness(es)'}
        </Text>
      )}
      {ghost.noEvidenceTells.length > 0 ? (
        <AtributeContainer
          mainAtribute="0 Evidence Tells"
          atributeList={ghost.noEvidenceTells}
        />
      ) : (
        <Text style={[styles.line, styles.atributeName]}>
          No 0 evidence tells
        </Text>
      )}
      {ghost.uniqueness.length > 0 ? (
        <AtributeContainer
          mainAtribute="Uniqueness(es)"
          atributeList={ghost.uniqueness}
        />
      ) : (
        <Text style={[styles.line, styles.atributeName]}>No uniquenesses</Text>
      )}
    </View>
  );
};

const AtributeContainer = ({mainAtribute, atributeList}) => {
  return (
    <View>
      <Text style={[styles.line, styles.atributeName]}>{mainAtribute}</Text>
      {atributeList.map((atribute, skey) => {
        return (
          <Text key={skey} style={[styles.line, styles.atributeInfo]}>
            {atribute}
          </Text>
        );
      })}
    </View>
  );
};

export default GhostInfoContainer;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'beige',
    width: '90%',
    padding: 20,
    color: '#251607',
    borderColor: '#624a2e',
    borderWidth: 3,
    borderRadius: 5,
  },
  header: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  evidenceContainer: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 150,
    marginVertical: 10,
    gap: 3,
  },
  evidenceLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  evidenceLineText: {
    color: '#251607',
    fontSize: 20,
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  line: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    color: '#251607',
  },
  ghostName: {
    fontSize: 28,
    fontFamily: 'PermanentMarker-Regular',
    color: '#251607',
  },
  atributeName: {
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: 'PermanentMarker-Regular',
  },
  atributeInfo: {
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 20,
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
});
