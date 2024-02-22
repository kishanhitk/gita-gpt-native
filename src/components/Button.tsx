import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
  ImageSourcePropType,
} from "react-native";
import StyledText from "./StyledText";

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  isLoading?: boolean;
  title: string;
  iconSrc?: ImageSourcePropType;
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  title,
  iconSrc,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={isLoading}
      className="mt-4 flex h-12 bg-black items-center justify-center rounded-md px-4 text-white"
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {iconSrc && (
            <Image
              source={iconSrc}
              className="w-5 h-5"
              style={{
                marginRight: 10,
              }}
            />
          )}
          <StyledText
            style={{
              fontWeight: "600",
            }}
            className="text-white text-xl"
          >
            {title}
          </StyledText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
