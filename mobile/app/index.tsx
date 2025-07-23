import "../global.css"
import { Text, View, StyleSheet } from "react-native";
 
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Nativewind!
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",       // equivalent to items-center
    justifyContent: "center",   // equivalent to justify-center
    backgroundColor: "white",   // equivalent to bg-white
  },
  title: {
    fontSize: 20,               // text-xl ~ 20px
    fontWeight: "bold",         // font-bold
    color: "#3B82F6",           // text-blue-500 (Tailwind blue-500)
  },
});