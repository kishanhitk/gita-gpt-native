import React from "react";
import { View } from "react-native";
import StyledText from "./StyledText";

const Hero = () => {
  return (
    <View className="flex items-center">
      <StyledText className="text-4xl dark:text-white">Gita GPT</StyledText>
      <StyledText
        style={{
          fontWeight: "300",
        }}
        className="mt-5 text-center text-lg dark:text-white/80"
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
        className="mt-4 text-center text-sm dark:text-white/70"
      >
        11,56,973+ Updesh generated so far
      </StyledText>
    </View>
  );
};

export default Hero;
