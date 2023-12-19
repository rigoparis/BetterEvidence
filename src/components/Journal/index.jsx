import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
  remove,
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

const BetterEvidence = () => {
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [rejectedEvidence, setRejectedEvidence] = useState([]);
  const [possibleGhosts, setPossibleGhosts] = useState([]);
  const [evidenceLimit, setEvidenceLimit] = useState(3);

  useEffect(() => {
    let result = filter(ghostInfo, (obj) => {
      let evidence = obj.evidence;
      return (
        every(selectedEvidence, (str) => includes(evidence, str)) &&
        !some(rejectedEvidence, (str) => includes(evidence, str))
      );
    });
    let selectedLength = selectedEvidence.length;
    let matchingOrMore = filter(
      result,
      (obj) => obj.evidence.length >= selectedLength,
    );
    if (evidenceLimit === 0 && includes(selectedEvidence, 'GHOSTORBS')) {
      matchingOrMore = filter(matchingOrMore, {name: 'The Mimic'});
    } else if (evidenceLimit === 0 && includes(rejectedEvidence, 'GHOSTORBS')) {
      matchingOrMore = filter(ghostInfo, (g) => g.name !== 'The Mimic');
    }
    return setPossibleGhosts(matchingOrMore);
  }, [selectedEvidence, rejectedEvidence]);

  useEffect(() => {
    if (possibleGhosts.length === 1) {
      showNotification();
    }
  }, [possibleGhosts]);

  const resetInvestigation = () => {
    setSelectedEvidence([]);
    setRejectedEvidence([]);
    setPossibleGhosts([]);
    Notifier.showNotification({
      title: 'Journal Reset',
      description:
        'Good luck on your next investigation, be careful out there.',
      duration: 5000,
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
    if (
      pEviName === 'GHOSTORB' &&
      !includes(selectedEvidence, 'GHOSTORB') &&
      !includes(rejectedEvidence, 'GHOSTORB') &&
      find(possibleGhosts, {name: 'The Mimic'})
    ) {
      Notifier.showNotification({
        title: 'POTENTIAL MIMIC',
        description: 'You selected Ghost Orbs, please be careful of a Mimic',
        duration: 5000,
        showAnimationDuration: 800,
        queueMode: 'next',
        showEasing: Easing.bounce,
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'warn',
        },
      });
    }
  };

  const getGhostNameStyles = (ghost) => {
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
      duration: 5000,
      queueMode: 'standby',
      showAnimationDuration: 800,
      showEasing: Easing.bounce,
    });
  };

  const checkifEvidencePossible = (evidenceKeyword) => {
    if (evidenceLimit === 0 && evidenceKeyword === 'GHOSTORBS') {
      return true;
    } else if (evidenceLimit === 0) {
      return false;
    }
    if (includes(rejectedEvidence, evidenceKeyword)) return true;
    if (
      !includes(selectedEvidence, evidenceKeyword) &&
      selectedEvidence.length === evidenceLimit
    )
      return false;
    return chain(possibleGhosts)
      .map((i) => i.evidence)
      .flatten()
      .uniq()
      .includes(evidenceKeyword)
      .value();
  };

  return (
    <NotifierWrapper>
      <ScrollView style={styles.background}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerHeader}>Evidence amount:</Text>
          <Picker
            selectedValue={evidenceLimit}
            style={styles.picker}
            dropdownIconColor="#FFF"
            prompt="Select amount of evidence"
            onValueChange={(itemValue, itemIndex) =>
              setEvidenceLimit(itemValue)
            }>
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
              disabled={!checkifEvidencePossible(evidence.keyword)}
              key={key}
              onPress={() => handleEvidencePress(evidence.keyword)}>
              <EvidenceContainer
                evidence={evidence}
                selected={!!includes(selectedEvidence, evidence.keyword)}
                rejected={!!includes(rejectedEvidence, evidence.keyword)}
                disabled={!checkifEvidencePossible(evidence.keyword)}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.subheader}>Ghosts</Text>
        <View style={styles.ghostContainer}>
          {ghostInfo.map((ghost, key) => {
            return (
              <Text style={getGhostNameStyles(ghost)} key={key}>
                {ghost.name}
              </Text>
            );
          })}
        </View>
        <Text style={styles.subheader}>Additional Info</Text>
        <View style={styles.infoContainer}>
          {evidenceLimit !== 0 && selectedEvidence.length === 0 && (
            <Text style={styles.text}>Please select at least 1 evidence</Text>
          )}
          {(evidenceLimit === 0 || selectedEvidence.length >= 1) &&
            possibleGhosts.map((ghost, key) => (
              <GhostInfoContainer ghost={ghost} key={key} />
            ))}
        </View>
      </ScrollView>
    </NotifierWrapper>
  );
};
export default BetterEvidence;

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
    fontSize: 28,
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
    fontSize: 24,
    color: '#C6CACE',
    textAlign: 'center',
    fontFamily: 'ShadowsIntoLight-Regular',
  },
  ghostNameRejected: {
    textDecorationLine: 'line-through',
    color: '#0A0C0F',
  },
  ghostNamePossible: {
    color: '#446D92',
    textShadowColor: '#C6CACE',
    textShadowRadius: 20,
  },
  text: {
    color: '#C6CACE',
    fontFamily: 'ShadowsIntoLight-Regular',
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
    fontSize: 16,
  },
  picker: {
    color: '#FFF',
    width: 90,
    fontFamily: 'ShadowsIntoLight-Regular',
  },
});

//TODO: Add reset selectedEvidence and rejectedEvidence
//TODO: Add evidence icons to ghost cards
