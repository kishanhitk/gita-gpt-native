import { View, Text } from "react-native";
import React from "react";

interface StyledTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const StyledText = ({ children, style, className }: StyledTextProps) => {
  return (
    <View>
      <Text
        className={className}
        style={{
          ...style,
          fontFamily:
            style?.fontWeight === "300"
              ? "Quicksand_300Light"
              : style?.fontWeight === "400"
              ? "Quicksand_400Regular"
              : style?.fontWeight === "500"
              ? "Quicksand_500Medium"
              : style?.fontWeight === "600"
              ? "Quicksand_600SemiBold"
              : style?.fontWeight === "700"
              ? "Quicksand_700Bold"
              : "Quicksand_400Regular",
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default StyledText;
