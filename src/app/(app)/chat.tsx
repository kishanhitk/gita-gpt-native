import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "~/components/Button";
import StyledText from "~/components/StyledText";

const Chat = () => {
  return (
    <View className="bg-white dark:bg-darkBlue h-full flex flex-col items-center justify-center px-5">
      <View className="flex items-center justify-center w-full ">
        <StyledText className=" dark:text-white text-6xl text-center">
          Coming Soon
        </StyledText>
        <StyledText className=" dark:text-white text-2xl text-center my-5">
          You will receive a notification when this feature is available.
        </StyledText>

        <Link href="about" asChild className="w-full justify-self-stretch">
          <Button title="Support the development"></Button>
        </Link>
      </View>
    </View>
  );
};

export default Chat;
