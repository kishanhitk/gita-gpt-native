import { View, Text } from "react-native";
import React from "react";
import { WifiOff } from "lucide-react-native";

const Offline = () => {
  return (
    <View className="bg-white dark:bg-darkBlue h-full items-center justify-center gap-5">
      <WifiOff className="h-20 w-20" />
      <Text className="text-4xl dark:text-white text-center">
        You are offline
      </Text>
      <Text className="text-lg dark:text-white text-center">
        Please connect to internet to use Gita GPT.
      </Text>
    </View>
  );
};

export default Offline;
