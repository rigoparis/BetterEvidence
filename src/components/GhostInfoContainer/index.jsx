import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

import {DOTS,EMF,FINGERPRINTS,GHOSTORB,SPIRITBOX,THERMOMETER,WRITINGBOOK} from '../../assets/evidenceImages';

const GhostInfoContainer = ({ghost}) => {
  const images = {DOTS,EMF,FINGERPRINTS,GHOSTORB,SPIRITBOX,THERMOMETER,WRITINGBOOK};
  return (
    <View style={styles.card}>
      <View style={[styles.line, styles.header]}>
        <Text style={styles.ghostName}>{ghost.name}</Text>
        <View style={styles.evidenceContainer}>
          {ghost.evidence.map(
            (evidence, key) =>
            <Image
              key={key}
              style={styles.tinyLogo}
              source={images[evidence]}
            />
          )}
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
      {ghost.abilities.length > 0 ? (
        <AtributeContainer
          mainAtribute="Abilities"
          atributeList={ghost.abilities}
        />
      ) : (
        <Text style={[styles.line, styles.atributeName]}>No abilities</Text>
      )}
      {ghost.weaknesses.length > 0 ? (
        <AtributeContainer
          mainAtribute="Weakness(es)"
          atributeList={ghost.weaknesses}
        />
      ) : (
        <Text style={[styles.line, styles.atributeName]}>{'No weakness(es)'}</Text>
      )}
    </View>
  )
}

const AtributeContainer = ({mainAtribute, atributeList}) => {
  return (
    <View>
      <Text style={[styles.line, styles.atributeName]}>{mainAtribute}</Text>
      {atributeList.map((atribute, skey) => {
        return (<Text key={skey} style={[styles.line, styles.atributeInfo]}>{atribute}</Text>);
      })}
    </View>
  )
}

export default GhostInfoContainer

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'beige',
    width: '90%',
    padding: 20,
    fontFamily: 'Courier',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    width: 100,
    marginBottom: 5,
  },
  line: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    color: '#251607'
  },
  ghostName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#251607'
  },
  atributeName: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 500,
  },
  atributeInfo: {
    paddingLeft: 20,
  },
  tinyLogo: {
    width: 25,
    height: 25,
  },
})