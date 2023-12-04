import { useRoute } from '@react-navigation/native';
import { Link, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

const ModalScreen = () => {
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const hash = route.params?.hash as string;

  useEffect(() => {
    fetch(`https://api.neynar.com/v1/farcaster/all-casts-in-thread?threadHash=${hash}&viewerFid=3`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api_key': process.env.NEYNAR_API_KEY ?? '',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.result.casts);
      setThread(organizeThread(data.result.casts));
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching thread:', error);
      setLoading(false);
    });
  }, [hash]);

  const organizeThread = (data) => {
    let thread = [];
    let map = {};

    data.forEach(cast => {
      cast.children = [];
      map[cast.hash] = cast;

      if (cast.parentHash) {
        map[cast.parentHash].children.push(cast);
      } else {
        thread.push(cast);
      }
    });

    return thread;
  };

  const renderThread = (casts, level = 0) => {
    console.log(casts[0], Object.keys(casts[0]))
    return casts.map(cast => (
      <View key={cast.hash} style={{ marginLeft: 20 * level, marginTop: 10 }}>
        {/* <Text style={styles.author}>{cast.author.displayName}</Text>
        <Text style={styles.text}>{cast.text}</Text> */}
        <View style={styles.castContainer}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: cast.author.pfp.url }} style={styles.profilePic} />
            <Text style={styles.username}>{cast.author.displayName}</Text>
            <View style={styles.reactionsContainer}>
              <Text style={styles.reactionText}>❤️ {cast.reactions.count}</Text>
              <Text style={styles.reactionText}>🔄 {cast.recasts.count}</Text>
              <Text style={styles.reactionText}>💬 {cast.replies.count}</Text>
            </View>
          </View>
          <Text style={styles.castText}>{cast.text}</Text>
        </View>
        {cast.children.length > 0 && renderThread(cast.children, level + 1)}
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Link href="/" asChild>
          <Text>
            Back
          </Text>
        </Link>
      </View>
      <ScrollView style={styles.container}>
        {loading ? <Text>Loading...</Text> : renderThread(thread)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingLeft: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  author: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
  },
  castContainer: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  reactionText: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    color: '#FFF',
    fontWeight: 'bold',
    flex: 1,
    marginHorizontal: 8,
  },
  castText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ModalScreen;