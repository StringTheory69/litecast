import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { NeynarCastV1 } from '../app/modal';
import NeynarV1CastComponent from './NeynarV1Cast';

interface FeedResponse {
  casts: NeynarCastV1[];
}

export default function NeynarLatestCasts() {
  const [feedResponse, setFeedResponse] = useState<FeedResponse | null>(null);

  useEffect(() => {
    async function getFeed() {
      const url = 'https://api.neynar.com/v1/farcaster/recent-casts?viewerFid=3&limit=25';
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'api_key': process.env.NEYNAR_API_KEY ?? '',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setFeedResponse(result.result);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    }
    getFeed();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      {feedResponse?.casts.map((cast, index) => (
  <Link key={index} href={`/modal?hash=${cast.hash}`} asChild>
    <Pressable>
      {({ pressed }) => (
        <NeynarV1CastComponent cast={cast} />
      )}
    </Pressable>
  </Link>
))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 0,
  },
});