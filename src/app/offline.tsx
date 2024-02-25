import { View, Text, Pressable } from "react-native";
import React from "react";
import { WifiOff } from "lucide-react-native";

interface OfflineProps {
  onRetry: () => void;
}
const Offline = ({ onRetry }: OfflineProps) => {
  return (
    <View className="bg-white dark:bg-darkBlue h-full items-center justify-center gap-5">
      <WifiOff className="h-20 w-20" />
      <Text className="text-4xl dark:text-white text-center">
        You are offline
      </Text>
      <Text className="text-lg dark:text-white text-center">
        Please connect to internet to use Gita GPT.
      </Text>

      <Pressable className="bg-blue-500 p-3 rounded-lg" onPress={onRetry}>
        <Text className="text-white">Retry</Text>
      </Pressable>
    </View>
  );
};

export default Offline;
