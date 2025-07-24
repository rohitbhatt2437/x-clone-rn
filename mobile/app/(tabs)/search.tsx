import { Feather } from "@expo/vector-icons";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "567K" },
  { topic: "#TechNews", tweets: "98K" },
];

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADERr */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            placeholder="Search Twitter"
            style={styles.searchInput}
            placeholderTextColor="#657786"
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Trending for you</Text>
          {TRENDING_TOPICS.map((item, index) => (
            <TouchableOpacity key={index} style={styles.trendingItem}>
              <Text style={styles.trendingSub}>Trending in Technology</Text>
              <Text style={styles.trendingTitle}>{item.topic}</Text>
              <Text style={styles.trendingSub}>{item.tweets} Tweets</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6", // gray-100
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // gray-100
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#000",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827", // gray-900
    marginBottom: 16,
  },
  trendingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6", // gray-100
  },
  trendingSub: {
    fontSize: 14,
    color: "#6b7280", // gray-500
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827", // gray-900
  },
});
