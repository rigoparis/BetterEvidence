import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  const [width, setWidth] = useState(0);

  const onLayout = (e) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const renderLines = () => {
    const lines = [];
    const numLines = Math.floor(progress * width);

    for (let i = 0; i < numLines; i++) {
      lines.push(<View key={i} style={styles.line} />);
    }

    return lines;
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {renderLines()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  line: {
    flex: 1,
    height: '100%',
    backgroundColor: '#4caf50',
  },
});

export default ProgressBar;
