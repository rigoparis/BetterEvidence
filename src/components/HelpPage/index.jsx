import React, {useCallback} from 'react';
import {Button, Text, View, Linking, StyleSheet} from 'react-native';

function SupportPage() {
  const takeToPayPal = useCallback(async () => {
    const url = 'https://www.buymeacoffee.com/rodriparisl';
    Linking.openURL(url);
  }, []);

  const emailDeveloper = useCallback(async () => {
    const url = 'mailto:theappcave@gmail.com?subject=In-App%20Feedback';
    Linking.openURL(url);
  }, []);

  const viewPrivacyPolicy = useCallback(async () => {
    const url =
      'https://docs.google.com/document/d/1iu3Q-Kd0si4Vk8x20YseF2R3NH7r7oMgYM7MZLwbguw/edit?usp=sharing';
    Linking.openURL(url);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          Having issues? Found a bug? Found misinformation on the app?
        </Text>
        <Text style={styles.sectionSubheader}>Email me to let me know!</Text>
        <Button title="Email the developer" onPress={emailDeveloper} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Find the privacy policy here</Text>
        <Button title="View privacy policy" onPress={viewPrivacyPolicy} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          Love the app and want to support it?
        </Text>
        <Button onPress={takeToPayPal} title="Support the developer ❤️" />
      </View>
    </View>
  );
}

export default SupportPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0A0C0F',
    height: '100%',
  },
  section: {
    backgroundColor: '#2e2f31',
    margin: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#446D92',
    borderRadius: 4,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 10,
  },
  sectionSubheader: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
});
