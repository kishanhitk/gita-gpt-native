import { ScrollView, View } from "react-native";
import { LoginWithGoogleButton } from "../components/LoginWithGoogleButton";
import StyledText from "../components/StyledText";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  return (
    <ScrollView className="bg-white dark:dark:bg-[#393358]">
      <View className="flex-1 items-center justify-center mx-5 flex-col h-screen">
        <StyledText className="text-4xl dark:text-white">Gita GPT</StyledText>
        <StyledText
          style={{
            fontWeight: "300",
          }}
          className="text-lg dark:text-white/80 mt-5 text-center"
        >
          Find solace in the wisdom of
        </StyledText>
        <StyledText
          style={{
            fontWeight: "500",
          }}
          className="my-2 text-xl dark:text-white/80"
        >
          Shree Krishna 🦚
        </StyledText>
        <StyledText
          style={{
            fontWeight: "300",
          }}
          className="text-sm dark:text-white/70 mt-4 text-center"
        >
          11,56,973+ Updesh generated so far
        </StyledText>

        <LoginWithGoogleButton />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};
export default Index;
