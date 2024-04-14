import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import StyledText from "./StyledText";
import { forwardRef } from "~/utils/forwardRef";

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  isLoading?: boolean;
  title: string;
  iconSrc?: ImageSourcePropType;
}

const ButtonComponent: React.ForwardRefRenderFunction<View, ButtonProps> = (
  { isLoading = false, title, iconSrc, ...props },
  ref
) => {
  return (
    <Pressable
      ref={ref}
      android_ripple={{
        color: "rgba(255,255,255,0.1)",
      }}
      {...props}
      disabled={isLoading}
      className="mt-4 flex h-12 bg-black dark:bg-black/70 items-center justify-center rounded-md px-4  text-white"
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
              style={{
                height: 20,
                width: 20,
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
    </Pressable>
  );
};

const Button = forwardRef(ButtonComponent);

export default Button;
