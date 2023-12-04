import { Image, StyleSheet, Text, View } from "react-native";
import { Cast } from "./NeynarTrendingCasts";


const CastComponent = ({ cast }: { cast: Cast}) => {
    return(
        <View style={styles.castContainer}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: cast.author.pfp_url }} style={styles.profilePic} />
            <Text style={styles.username}>{cast.author.display_name}</Text>
            <View style={styles.reactionsContainer}>
              <Text style={styles.reactionText}>❤️ {cast.reactions.likes.length}</Text>
              <Text style={styles.reactionText}>🔄 {cast.reactions.recasts.length}</Text>
              <Text style={styles.reactionText}>💬 {cast.replies.count}</Text>
            </View>
          </View>
          <Text style={styles.castText}>{cast.text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
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

export default CastComponent;