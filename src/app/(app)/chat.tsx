import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import StyledText from "../../components/StyledText";

const Chat = () => {
  return (
    <View className="bg-white dark:bg-darkBlue h-full flex flex-col items-center justify-center px-10">
      <View className="flex items-center justify-center">
        <StyledText className=" dark:text-white text-6xl">
          Coming Soon
        </StyledText>
        <StyledText className=" dark:text-white text-2xl text-center my-5">
          You will receive a notification when this feature is available.
        </StyledText>
        <Link href="upi://pay?pa=kishans.in@ybl&pn=KishanKumar&cu=INR" asChild>
          <Button title="Donate to support the development"></Button>
        </Link>
      </View>
    </View>
  );
};

export default Chat;
