import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import NeynarTrendingCasts from '../../components/NeynarTrendingCasts';
import { useEffect } from 'react';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <NeynarTrendingCasts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
