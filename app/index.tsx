import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <Pressable
        style={{
          backgroundColor: "black",
          borderRadius: 7,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Quicksand_600SemiBold",
            fontSize: 18,
          }}
        >
          Submit
        </Text>
      </Pressable>
      <Text className="font-bold text-xl my-10">Tailwind Demo</Text>
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
    marginHorizontal: 20,
  },
});
