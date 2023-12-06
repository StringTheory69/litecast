import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Assuming these are your custom functions
import { airstackGetPoapsAndNfts, airstackGetFarcasterEthTokenHolders } from '../../constants/helpers';
import { Cast } from '../../components/NeynarTrendingCasts';
import { Link } from 'expo-router';
import CastComponent from '../../components/Cast';

interface TokenNft {
  contentValue: {
    image: {
      small: string;
    };
  };
  metaData: {
    name: string;
    description: string;
  };
}

interface TokenBalance {
  owner: {
    identity: string;
  };
  amount: string;
  tokenAddress: string;
  tokenId: string;
  tokenType: string;
  tokenNfts: TokenNft;
}

interface PoapEvent {
  eventName: string;
  eventId: string;
  eventURL: string;
  isVirtualEvent: boolean;
  city: string;
  contentValue: {
    image: {
      extraSmall: string;
      large: string;
      medium: string;
      original: string;
      small: string;
    };
  };
}

interface PageInfo {
  nextCursor: string;
  prevCursor: string;
}

interface BlockchainTokenBalances {
  TokenBalance: TokenBalance[];
  pageInfo: PageInfo;
}

interface Poaps {
  Poap: PoapEvent[];
  pageInfo: PageInfo;
}

interface AirstackData {
  Ethereum: BlockchainTokenBalances;
  Polygon: BlockchainTokenBalances;
  Poaps: Poaps;
}

export default function TabThreeScreen() {
  const [data, setData] = useState<AirstackData | null>(null);
  const [selectedEthereum, setSelectedEthereum] = useState<string>("");
  const [isPickerVisible, setIsPickerVisible] = useState(true);
  const [casts, setCasts] = useState<Cast[] | null>(null);

  async function getAirstackData(query: string){
    const airstackUrl = 'https://api.airstack.xyz/graphql';
    const data = await fetch(airstackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AIRSTACK_API_KEY ?? '',
      },
      body: JSON.stringify({ query: query }),
    });
    const response = await data.json();
    return response;
  }

  async function fetchAirstack() {
    const response = await getAirstackData(airstackGetPoapsAndNfts);
    if(response.data){
      setData(response.data);
      // console.log(response.data.Ethereum.TokenBalance[0]);
    }
  }

  useEffect(() => {
    fetchAirstack();
  }, []);

  async function getFID(fname: string) {
    try {
      const response = await fetch(`https://api.farcasterkit.com/users/user?fname=${fname}`, {
        method: 'GET'
      });
  
      if (!response.ok) {
        console.error(`Network response was not ok: ${response.status} ${response.statusText}`);
        return null; // or handle error appropriately
      }
      const data = await response.json();
      return data.user.fid;
    } catch (error) {
      console.error('Error occurred:', error);
      return null; // or handle error appropriately
    }
  }  
  async function getFidsAndFeed(){
    const query = airstackGetFarcasterEthTokenHolders(selectedEthereum);
    const response = await getAirstackData(airstackGetFarcasterEthTokenHolders(selectedEthereum));
    if(response.data){
      const profileNames = response.data.Ethereum.TokenBalance
      .filter(token => token.owner.socials && token.owner.socials.length > 0)
      .map(token => token.owner.socials[0].profileName);
      console.log(profileNames);
      const fids = await Promise.all(profileNames.map(name => getFID(name)));
      getCastsFromTokenHolders(fids);
    }
  }

  async function getCastsFromTokenHolders(fids: string[]){
    const url = `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=fids&fids=${fids.join(",")}&limit=25`;
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
      console.log(result.casts.length);
      setCasts(result.casts);
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  }

  const handleSubmit = () => {
    setIsPickerVisible(false);
    getFidsAndFeed();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose an ETH NFT(via Airstack)</Text>
      <View style={styles.separator} />

      {isPickerVisible && casts === null && (
      <>
        <Picker
          selectedValue={selectedEthereum || data?.Ethereum.TokenBalance[0]?.tokenAddress}
          onValueChange={(itemValue) => setSelectedEthereum(itemValue)}
          style={{ width: '100%', height: 50 }}
        >
          {data?.Ethereum.TokenBalance.map((token, index) => (
            `${token.tokenNfts.metaData.name}` !== 'null' &&
            <Picker.Item key={index} label={`${token.tokenNfts.metaData.name}`} value={token.tokenAddress} />
          ))}
        </Picker>
        <Button title="Submit" onPress={handleSubmit}  />
      </>
      )}
       {casts && casts.map((cast, index) => (
        <Link key={index} href={`/modal?hash=${cast.hash}`} asChild>
          <Pressable>
            {({ pressed }) => (
              <CastComponent cast={cast} />
            )}
          </Pressable>
        </Link>
      ))}
      
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});