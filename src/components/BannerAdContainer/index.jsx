import React from 'react';
import appjson from '../../../app.json';

import {TestIds, BannerAd} from 'react-native-google-mobile-ads';
import {View} from 'react-native';

function BannerAdContainer({bannerSize}) {
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : appjson['react-native-google-mobile-ads'].admob_banner_id;

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
    <View style={{display: 'flex', justifyContent: 'center'}}>
      <BannerAd
        unitId={adUnitId}
        size={bannerSize}
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
