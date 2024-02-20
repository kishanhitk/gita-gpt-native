import clsx from "clsx";
import React from "react";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";
import StyledText from "./StyledText";

interface ButtonProps {
  isLoading?: boolean;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ isLoading = false, title }) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      className="mt-4 flex h-12 bg-black items-center justify-center rounded-md px-4 text-white"
      onPress={() => {}}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <StyledText
          style={{
            fontWeight: "600",
          }}
          className="text-white text-xl"
        >
          {title}
        </StyledText>
      )}
    </TouchableOpacity>
  );
};

export default Button;
