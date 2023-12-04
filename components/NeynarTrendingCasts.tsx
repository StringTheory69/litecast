import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import CastComponent from './Cast';

export interface Cast {
  hash: string;
  author: {
    username: string;
    pfp_url: string;
    display_name: string;
  };
  text: string;
  timestamp: string;
  embeds?: { url: string }[];
  reactions: {
    likes: Array<{ fid: number, fname: string }>;
    recasts: Array<{ fid: number, fname: string }>;
  };
  replies: { count: number };
}

interface FeedResponse {
  casts: Cast[];
}

export default function NeynarTrendingCasts() {
  const [feedResponse, setFeedResponse] = useState<FeedResponse | null>(null);

  useEffect(() => {
    async function getFeed() {
      const url = 'https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=global_trending&limit=25';
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
        setFeedResponse(result);
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
        <CastComponent cast={cast} />
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