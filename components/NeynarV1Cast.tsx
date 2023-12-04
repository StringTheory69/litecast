import { Image, StyleSheet, Text, View } from "react-native";
import { Cast } from "./NeynarTrendingCasts";
import { NeynarCastV1 } from "../app/modal";


const NeynarV1CastComponent = ({ cast }: { cast: NeynarCastV1}) => {
  return(
    <View style={styles.castContainer}>
      <View style={styles.castContentContainer}>
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
        {cast.embeds && (
          <View style={styles.imagesContainer}>
            {cast.embeds.filter(embed => /\.(jpg|jpeg|png|gif)$/i.test(embed.url))
                       .slice(0, 2) // Limit to 2 images
                       .map((embed, index) => (
                         <Image 
                           key={index}
                           source={{ uri: embed.url }} 
                           style={styles.image} 
                         />
                       ))
            }
          </View>
        )}
      </View>
    </View>
  )  
};

const styles = StyleSheet.create({
    castContainer: {
      backgroundColor: '#fff',
      borderBottomWidth: .4,
      borderBottomColor: '#333',
      marginBottom: 10,
      width: '100%',
    },  
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    castContentContainer: {
      padding: 16,
    },
    reactionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
    },
    reactionText: {
      color: '#000',
      marginLeft: 8,
      fontSize: 14,
    },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    username: {
      color: '#000',
      fontWeight: 'bold',
      flex: 1,
      marginHorizontal: 8,
    },
    castText: {
      color: '#000',
      fontSize: 16,
      padding: 2,
      paddingLeft: 5,
    },
    imagesContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 10,
    },
    
    image: {
      width: 100, // Set your desired width
      height: 100, // Set your desired height
      marginRight: 10, // Add some margin if you like
    },
});

export default NeynarV1CastComponent;