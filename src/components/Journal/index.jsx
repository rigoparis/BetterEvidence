import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import EvidenceContainer from '../EvidenceContainer';
import evidenceInfo from '../../jsonInfo/evidenceInfo.json';
import ghostInfo from '../../jsonInfo/ghostInfo.json';
import {
  includes,
  without,
  filter,
  every,
  some,
  find,
  chain,
  map,
  concat,
  reject,
} from 'lodash';
import GhostInfoContainer from '../GhostInfoContainer';
import {
  NotifierWrapper,
  Notifier,
  Easing,
  NotifierComponents,
} from 'react-native-notifier';
import {Picker} from '@react-native-picker/picker';
import Spinner from '../../assets/icons/spinner11.svg';

const Journal = () => {
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [rejectedEvidence, setRejectedEvidence] = useState([]);
  const [possibleGhosts, setPossibleGhosts] = useState([]);
  const [possibleEvidence, setPossibleEvidence] = useState(
    map(evidenceInfo.starterEquipment.equipment, 'keyword'),
  );
  const [evidenceLimit, setEvidenceLimit] = useState(3);
  const [rejectedGhosts, setRejectedGhosts] = useState([]);
  const [isNotificationOnCD, setIsNotificationOnCD] = useState(false);

  useEffect(() => {
    let filteredGhosts = ghostInfo;
    if (evidenceLimit === 0) {
      if (selectedEvidence.length > 0) {
        filteredGhosts = [find(filteredGhosts, {name: 'The Mimic'})];
      } else if (rejectedEvidence.length > 0) {
        filteredGhosts = reject(filteredGhosts, {name: 'The Mimic'});
      } else {
        filteredGhosts = ghostInfo;
      }
    } else if (evidenceLimit === 1) {
      let newEvidence;
      if (selectedEvidence.length > evidenceLimit) {
        filteredGhosts = [find(ghostInfo, {name: 'The Mimic'})];
        newEvidence = concat(selectedEvidence, rejectedEvidence);
      }
      if (selectedEvidence.length === evidenceLimit) {
        const mimic = find(ghostInfo, {name: 'The Mimic'});
        if (
          selectedEvidence.length === 1 &&
          includes(selectedEvidence, 'GHOSTORBS')
        ) {
          newEvidence = mimic.evidence;
        } else if (
          selectedEvidence.length === 1 &&
          includes(mimic.evidence, selectedEvidence[0])
        ) {
          newEvidence = [
            'GHOSTORBS',
            ...concat(selectedEvidence, rejectedEvidence),
          ];
        } else {
          newEvidence = concat(selectedEvidence, rejectedEvidence);
        }
        filteredGhosts = filter(filteredGhosts, (i) => {
          if (i.guaranteedEvidence !== undefined) {
            return (
              every(selectedEvidence, (str) => includes(i.evidence, str)) &&
              includes(newEvidence, i.guaranteedEvidence) &&
              !includes(rejectedEvidence, i.guaranteedEvidence)
            );
          }
          return every(selectedEvidence, (str) => includes(i.evidence, str));
        });
      }
      if (!newEvidence)
        newEvidence = chain(ghostInfo).map('evidence').flatten().uniq().value();
      setPossibleEvidence(newEvidence);
    } else if (evidenceLimit === 2) {
      let newEvidence;
      let hypotheticalPossibleEvidence = chain(ghostInfo)
        .filter((i) =>
          some(concat(selectedEvidence, rejectedEvidence), (str) =>
            includes(i.evidence, str),
          ),
        )
        .map((i) => i.evidence)
        .flatten()
        .uniq()
        .value();
      if (selectedEvidence.length > evidenceLimit) {
        filteredGhosts = [find(ghostInfo, {name: 'The Mimic'})];
        newEvidence = concat(selectedEvidence, rejectedEvidence);
      }
      if (selectedEvidence.length === evidenceLimit) {
        filteredGhosts = filter(filteredGhosts, (i) => {
          if (i.guaranteedEvidence !== undefined) {
            return (
              every(selectedEvidence, (str) => includes(i.evidence, str)) &&
              !includes(rejectedEvidence, i.guaranteedEvidence) &&
              includes(hypotheticalPossibleEvidence, i.guaranteedEvidence)
            );
          }
          return every(selectedEvidence, (str) => includes(i.evidence, str));
        });
        const mimic = find(filteredGhosts, {name: 'The Mimic'});
        if (mimic !== undefined && !includes(selectedEvidence, 'GHOSTORBS')) {
          newEvidence = [
            'GHOSTORBS',
            ...concat(selectedEvidence, rejectedEvidence),
          ];
        } else if (
          mimic !== undefined &&
          includes(selectedEvidence, 'GHOSTORBS')
        ) {
          newEvidence = mimic.evidence;
        } else {
          newEvidence = concat(selectedEvidence, rejectedEvidence);
        }
      }
      if (selectedEvidence.length === 1) {
        filteredGhosts = filter(filteredGhosts, (i) => {
          if (i.guaranteedEvidence !== undefined) {
            return (
              every(selectedEvidence, (str) => includes(i.evidence, str)) &&
              !includes(rejectedEvidence, i.guaranteedEvidence) &&
              includes(hypotheticalPossibleEvidence, i.guaranteedEvidence)
            );
          }
          return every(selectedEvidence, (str) => includes(i.evidence, str));
        });
      }
      if (!newEvidence)
        newEvidence = chain(filteredGhosts)
          .map('evidence')
          .concat(rejectedEvidence)
          .flatten()
          .uniq()
          .value();
      setPossibleEvidence(newEvidence);
    } else if (evidenceLimit === 3) {
      filteredGhosts = filter(filteredGhosts, (i) => {
        return (
          every(selectedEvidence, (str) => includes(i.evidence, str)) &&
          !some(rejectedEvidence, (str) => includes(i.evidence, str))
        );
      });
      setPossibleEvidence(
        chain(filteredGhosts)
          .map('evidence')
          .concat(rejectedEvidence)
          .flatten()
          .uniq()
          .value(),
      );
    }
    setPossibleGhosts(filteredGhosts);
  }, [selectedEvidence, rejectedEvidence, evidenceLimit]);

  useEffect(() => {
    if (possibleGhosts.length === 1) {
      if (!isNotificationOnCD) {
        showNotification();
        setIsNotificationOnCD(true);
        setTimeout(() => {
          setIsNotificationOnCD(false);
        }, 1000 * 60 * 5);
      }
      setRejectedGhosts([]);
    }
  }, [possibleGhosts]);

  const resetInvestigation = () => {
    setPossibleEvidence(
      evidenceLimit === 0
        ? ['GHOSTORBS']
        : map(evidenceInfo.starterEquipment.equipment, 'keyword'),
    );
    setSelectedEvidence([]);
    setRejectedEvidence([]);
    setPossibleGhosts(evidenceLimit === 0 ? ghostInfo : []);
    setRejectedGhosts([]);
    Notifier.showNotification({
      title: 'Journal Reset',
      description:
        'Good luck on your next investigation, be careful out there.',
      duration: 3000,
      showAnimationDuration: 800,
      queueMode: 'next',
      showEasing: Easing.bounce,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success',
      },
    });
  };

  const handleEvidencePress = (pEviName) => {
    if (includes(selectedEvidence, pEviName)) {
      const newSelectedEvidence = without(selectedEvidence, pEviName);
      const newRejectedEvidence = rejectedEvidence.concat(pEviName);
      setSelectedEvidence(newSelectedEvidence);
      setRejectedEvidence(newRejectedEvidence);
    } else if (includes(rejectedEvidence, pEviName)) {
      const newRejectedEvidence = without(rejectedEvidence, pEviName);
      setRejectedEvidence(newRejectedEvidence);
    } else {
      const newSelectedEvidence = selectedEvidence.concat(pEviName);
      const newRejectedEvidence = without(rejectedEvidence, pEviName);
      setRejectedEvidence(newRejectedEvidence);
      setSelectedEvidence(newSelectedEvidence);
    }
  };

  const getGhostNameStyles = (ghost) => {
    if (!!find(rejectedGhosts, {name: ghost.name}))
      return [styles.ghostName, styles.ghostNameRejectedManual];
    if (selectedEvidence.length > 0 && possibleGhosts.length === 0)
      return [styles.ghostName, styles.ghostNameRejected];
    if (possibleGhosts.length > 0) {
      if (possibleGhosts.length === 1 && find(possibleGhosts, ghost))
        return [styles.ghostName, styles.ghostNamePossible];
      if (find(possibleGhosts, ghost)) {
        return [styles.ghostName];
      }
      return [styles.ghostName, styles.ghostNameRejected];
    }
    return [styles.ghostName];
  };

  const showNotification = () => {
    Notifier.showNotification({
      title: 'Mark your ghost',
      description: "If you're sure, remember to press 'J' and mark the ghost",
      duration: 3000,
      queueMode: 'next',
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });
  };

  const handleRejectGhosts = (ghost) => () => {
    if (includes(rejectedGhosts, ghost)) {
      setRejectedGhosts(without(rejectedGhosts, ghost));
      setPossibleGhosts([ghost, ...possibleGhosts]);
    } else {
      setRejectedGhosts([ghost, ...rejectedGhosts]);
      setPossibleGhosts(reject(possibleGhosts, ghost));
    }
  };

  return (
    <NotifierWrapper>
      <FlatList
        ListHeaderComponent={
          <View style={styles.background}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerHeader}>Evidence amount:</Text>
              <Picker
                selectedValue={evidenceLimit}
                style={styles.picker}
                dropdownIconColor="#FFF"
                prompt="Select amount of evidence"
                onValueChange={(itemValue, itemIndex) => {
                  setEvidenceLimit(itemValue);
                  setPossibleEvidence(
                    itemValue === 0
                      ? ['GHOSTORBS']
                      : map(evidenceInfo.starterEquipment.equipment, 'keyword'),
                  );
                  setSelectedEvidence([]);
                  setRejectedEvidence([]);
                  setPossibleGhosts(itemValue === 0 ? ghostInfo : []);
                  setRejectedGhosts([]);
                }}>
                <Picker.Item label={3} value={3} />
                <Picker.Item label={2} value={2} />
                <Picker.Item label={1} value={1} />
                <Picker.Item label={0} value={0} />
              </Picker>
            </View>
            <View>
              <Text style={styles.subheader}>Select evidence</Text>
              <TouchableOpacity
                style={styles.restartIcon}
                onPress={() => resetInvestigation()}>
                <Spinner width={20} height={20} fill="#C6CACE" />
              </TouchableOpacity>
            </View>
            <View style={styles.evidenceContainer}>
              {evidenceInfo.starterEquipment.equipment.map((evidence, key) => (
                <TouchableOpacity
                  disabled={!includes(possibleEvidence, evidence.keyword)}
                  key={key}
                  onPress={() => handleEvidencePress(evidence.keyword)}>
                  <EvidenceContainer
                    evidence={evidence}
                    selected={includes(selectedEvidence, evidence.keyword)}
                    rejected={includes(rejectedEvidence, evidence.keyword)}
                    disabled={!includes(possibleEvidence, evidence.keyword)}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.subheader}>Ghosts</Text>
            <Text
              style={{
                fontSize: RFValue(12),
                textAlign: 'center',
                paddingTop: 5,
                paddingBottom: 10,
              }}>
              You can tap ghost names to eliminate them
            </Text>
            <View style={styles.ghostContainer}>
              {ghostInfo.map((ghost, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    disabled={
                      !includes(
                        concat(possibleGhosts, rejectedGhosts),
                        ghost,
                      ) || possibleGhosts.length === 1
                    }
                    onPress={handleRejectGhosts(ghost)}>
                    <Text style={getGhostNameStyles(ghost)}>{ghost.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.subheader}>Additional Info</Text>
            {possibleGhosts.length === 0 && (
              <View>
                <Text
                  style={{
                    ...styles.text,
                    textAlign: 'center',
                    paddingVertical: 5,
                  }}>
                  Please select at least 1 evidence
                </Text>
              </View>
            )}
          </View>
        }
        data={possibleGhosts}
        initialNumToRender={1}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        renderItem={({item}) => (
          <View
            style={{
              paddingBottom: 10,
              paddingHorizontal: 20,
              backgroundColor: '#2e2f31',
            }}>
            <GhostInfoContainer ghost={item} />
          </View>
        )}
      />
    </NotifierWrapper>
  );
};
export default Journal;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    gap: 5,
  },
  evidenceContainer: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    gap: 20,
  },
  evidenceHeaderContainer: {
    flex: 0,
    flexDirection: 'row',
  },
  ghostContainer: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    columnGap: 20,
    rowGap: 15,
  },
  infoContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
    paddingTop: 10,
    marginBottom: 20,
    paddingBottom: 20,
  },
  subheader: {
    fontSize: RFValue(26),
    color: '#738B9B',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'PermanentMarker-Regular',
  },
  restartIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: 10,
  },
  background: {
    backgroundColor: '#2e2f31',
    paddingBottom: 20,
  },
  ghostName: {
    width: 100,
    fontSize: RFValue(20),
    color: '#C6CACE',
    textAlign: 'center',
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  ghostNameRejected: {
    textDecorationLine: 'line-through',
    color: '#0A0C0F',
  },
  ghostNameRejectedManual: {
    textDecorationLine: 'line-through',
    color: '#ff3333',
  },
  ghostNamePossible: {
    color: '#446D92',
    textShadowColor: '#C6CACE',
    textShadowRadius: 20,
  },
  text: {
    color: '#C6CACE',
    fontFamily: 'ShadowsIntoLight-Regular',
    fontSize: RFValue(14),
  },
  pickerContainer: {
    backgroundColor: '#0A0C0F',
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerHeader: {
    color: '#FFF',
    fontSize: RFValue(16),
  },
  picker: {
    color: '#FFF',
    width: 90,
    fontFamily: 'ShadowsIntoLight-Regular',
  },
});

//TODO: Add reset selectedEvidence and rejectedEvidence
//TODO: Add evidence icons to ghost cards
