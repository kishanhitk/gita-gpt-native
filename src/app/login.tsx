import { ScrollView, View, Text } from "react-native";
import { LoginWithGoogleButton } from "~/components/LoginWithGoogleButton";
import StyledText from "~/components/StyledText";
import { StatusBar } from "expo-status-bar";
import Hero from "~/components/Hero";
import { Trans } from "@lingui/macro";

const Index = () => {
  return (
    <ScrollView className="bg-white dark:dark:bg-[#393358]">
      <View className="flex-1 items-center justify-center mx-5 flex-col h-screen">
        <Hero />
        <Text>
          <Trans>I like the weather.</Trans>
        </Text>
        <LoginWithGoogleButton />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};
export default Index;
