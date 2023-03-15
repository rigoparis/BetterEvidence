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
import {includes, without, difference, intersection, filter, every, some, find} from 'lodash';
import GhostInfoContainer from '../GhostInfoContainer';
import {
  NotifierWrapper,
  Notifier,
  Easing,
  NotifierComponents,
} from 'react-native-notifier';
import Spinner from '../../assets/icons/spinner11.svg';

const BetterEvidence = () => {
  const [selectedEvidence, setSelectedEvidence] = useState([]);
  const [rejectedEvidence, setRejectedEvidence] = useState([]);
  const [possibleGhosts, setPossibleGhosts] = useState([]);

  useEffect(() => {
    let result = filter(ghostInfo, obj => {
      let evidence = obj.evidence;
      return every(selectedEvidence, str => includes(evidence, str)) && !some(rejectedEvidence, str => includes(evidence, str));
    });
    let selectedLength = selectedEvidence.length;
    let matchingOrMore = filter(result, obj => obj.evidence.length >= selectedLength);
    return setPossibleGhosts(matchingOrMore);
  }, [selectedEvidence, rejectedEvidence])

  useEffect(() => {
    if (possibleGhosts.length === 1) {
      showNotification();
    }
  }, [possibleGhosts])
  
  const resetInvestigation = () => {
    setSelectedEvidence([]);
    setRejectedEvidence([]);
    Notifier.showNotification({
      title: 'Journal Reset',
      description: 'Good luck on your next investigation, be careful out there.',
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
    if (possibleGhosts.length > 0) {
      if (possibleGhosts.length === 1 && find(possibleGhosts, ghost)) return [styles.ghostName, styles.ghostNamePossible];
      if (find(possibleGhosts, ghost)) {
        return [styles.ghostName];
      }
      return [styles.ghostName, styles.ghostNameRejected];
    }
    return [styles.ghostName]
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

  return (
    <NotifierWrapper>
      <ScrollView style={styles.background}>
        <Text style={styles.subheader}>Select evidence</Text>
        <TouchableOpacity style={styles.restartIcon} onPress={() => resetInvestigation()}>
          <Spinner width={20} height={20} fill="#C6CACE" />
        </TouchableOpacity>
        <View style={styles.evidenceContainer}>
          {evidenceInfo.map((evidence, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => handleEvidencePress(evidence.keyword)}>
                <EvidenceContainer
                  evidence={evidence}
                  selected={!!includes(selectedEvidence, evidence.keyword)}
                  rejected={!!includes(rejectedEvidence, evidence.keyword)}
                />
              </TouchableOpacity>
            );
          })}
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
          {selectedEvidence.length === 0 && (
            <Text style={styles.text}>Please select at least 1 evidence</Text>
          )}
          {selectedEvidence.length >= 1 &&
            possibleGhosts.map(
              (ghost, key) =>
                <GhostInfoContainer ghost={ghost} key={key} />,
            )
          }
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
    paddingBottom: 20
  },

  subheader: {
    fontSize: 20,
    color: '#738B9B',
    textDecorationLine: 'underline',
    textAlign: 'center',
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
    paddingTop: 20,
    paddingBottom: 20,
  },

  ghostName: {
    width: 100,
    fontSize: 16,
    color: '#C6CACE',
    textAlign: 'center',
  },

  ghostNameRejected: {
    textDecorationLine: 'line-through',
    color: '#0A0C0F',
  },

  ghostNamePossible: {
    color: '#446D92',
    textShadowColor:'#C6CACE',
    textShadowRadius:20,
  },

  text: {
    color: '#C6CACE',
  },
});

//TODO: Add reset selectedEvidence and rejectedEvidence
//TODO: Add evidence icons to ghost cards
