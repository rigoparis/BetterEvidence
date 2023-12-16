import mobileAds, {
  MaxAdContentRating,
  AdsConsent,
  AdsConsentDebugGeography,
  AppOpenAd,
} from 'react-native-google-mobile-ads';

const requestConsent = async () => {
  // Checks if we need to re-ask consent (eg: due to conditions change at provider-side)
  const consentInfo = await AdsConsent.requestInfoUpdate({
    debugGeography: AdsConsentDebugGeography.EEA,
  });
  console.log('Checking if we need to ask user consent', consentInfo);
  if (consentInfo.status === 'NOT_REQUIRED') return configureAndInitialize();
  if (consentInfo.status !== 'OBTAINED') {
    // Asks consent
    console.log('Asking user consent');
    const {status} = await AdsConsent.loadAndShowConsentFormIfRequired();
  }

  // Shows ad if user gaves enough consent
  const userChoice = await AdsConsent.getUserChoices();
  console.log('checking user choice', userChoice);
  if (userChoice.storeAndAccessInformationOnDevice) {
    // Initializes ads
    console.log('Ok we got user consent to display ads');
    configureAndInitialize();
  } else {
    // For the moment, we just let the user use the app freely if he doesn't give consent for ads
    console.log(
      'User did not gave enough consent to use admob (missing "storeAndAccessInformationOnDevice" right)',
    );
  }
};

const configureAndInitialize = () =>
  mobileAds()
    .setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.T,
    })
    .then(() => {
      console.log('Ads config set');
      mobileAds()
        .initialize()
        .then(() => console.log('Ads initialized successfully'));
    });

AdsConsent.reset();
requestConsent();
