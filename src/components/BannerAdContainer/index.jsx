import React, {useState} from 'react';
import {View} from 'react-native';
import appjson from '../../../app.json';

import {
  TestIds,
  BannerAd,
  BannerAdSize,
  RevenuePrecisions,
} from 'react-native-google-mobile-ads';

function BannerAdContainer() {
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : appjson['react-native-google-mobile-ads'].admob_lower_banner_id;

  const postJSON = async (data) => {
    try {
      const response = await fetch('http://192.168.1.3:5000/adrevenue/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.text();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onPaid={(event) => {
          // console.log(
          //   `Paid: ${event.value} ${event.currency} (precision ${
          //     RevenuePrecisions[event.precision]
          //   }})`,
          // );
          // postJSON({
          //   value: event.value,
          //   currency: event.currency,
          //   precision: RevenuePrecisions[event.precision],
          // });
        }}
      />
    </View>
  );
}

export default BannerAdContainer;
