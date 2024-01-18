import React, {useEffect, useState} from 'react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import appjson from '../../../app.json';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : appjson['react-native-google-mobile-ads'].admob_app_open_id;

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

const InterstitialAdContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeEarned = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        setShown(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded || shown) {
    return null;
  }

  return interstitial.show();
};

export default InterstitialAdContainer;
