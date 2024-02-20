import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 34,
          marginBottom: 20,
          fontFamily: "Quicksand_600SemiBold",
        }}
      >
        Gita GPT 🦚
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
          fontFamily: "Quicksand_400Regular",
        }}
      >
        Find sloce in the wisdom of Shree Krishna
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
