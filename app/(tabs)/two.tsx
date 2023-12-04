import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import NeynarLatestCasts from '../../components/NeynarLatestCasts';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <NeynarLatestCasts />
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
