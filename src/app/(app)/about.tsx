import {
  View,
  Text,
  Pressable,
  Share,
  ToastAndroid,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import * as Application from "expo-application";
import StyledText from "~/components/StyledText";
import Hero from "~/components/Hero";
import { Link } from "expo-router";
import * as Clipboard from "expo-clipboard";
import Button from "~/components/Button";
import * as Linking from "expo-linking";

const About = () => {
  return (
    <View className="bg-white dark:bg-darkBlue h-full">
      <ScrollView>
        <View
          style={{
            margin: 30,
          }}
        >
          <Hero />
          <View
            style={{
              marginTop: 20,
            }}
          >
            <StyledText className="dark:text-white/80 mb-5 text-center">
              Version: {Application.nativeApplicationVersion}
            </StyledText>
            <StyledText>
              Gita GPT is free to use and completely ad-free. But the API and
              server costs money to run.
              {"\n"}
              {"\n"}
              If you find joy or value in Gita GPT, please consider supporting
              it.
              {"\n"}
              {"\n"}
              Whether it's a donation, a positive review, or sharing it with
              others, every bit helps to keep it alive and evolving.
              {"\n"}
              {"\n"}
              Thank you for any support you can offer. It means the world to me
              and the future of Gita GPT.
              {"\n"}
              {"\n"}
              <Link href="https://twitter.com/jst_kishan" asChild>
                <Text
                  style={{
                    fontWeight: "600",
                    textDecorationLine: "underline",
                  }}
                  className="dark:text-white/80 underline"
                >
                  Kishan Kumar
                </Text>
              </Link>
            </StyledText>
            <Button
              title="Rate Gita GPT 🌟"
              onPress={async () => {
                Linking.openURL(
                  "market://details?id=com.kishans.gitagpt&showAllReviews=true"
                );
              }}
            ></Button>
            <Button
              title="Donate to kishans.in@ybl"
              onPress={async () => {
                await Clipboard.setStringAsync("kishans.in@ybl");
                ToastAndroid.show(
                  "UPI ID copied to clipboard",
                  ToastAndroid.SHORT
                );
              }}
            ></Button>

            <Button
              title="Share Gita GPT"
              onPress={async () => {
                Share.share({
                  message: `Gita GPT\nFind solace in the wisdom of Shree Krishna 🦚\n\nAsk Krishna for guidance: https://gita.kishans.in/android`,
                });
              }}
            ></Button>
            <Link href="https://twitter.com/jst_kishan" asChild>
              <Button title="Follow on Twitter for updates"></Button>
            </Link>
            {/* BUG: The link does not work if the child is an <Imaage/> */}
            {/* <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                asChild
                href="https://www.buymeacoffee.com/jstkishan"
                style={{
                  marginTop: 20,
                }}
              >
                <Image
                  source={{
                    uri: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png",
                  }}
                  style={{
                    height: 45,
                    width: 162,
                  }}
                />
              </Link>
            </View> */}
            <Pressable
              className="flex items-center justify-center"
              onPress={async () => {
                Linking.openURL("https://www.buymeacoffee.com/jstkishan");
              }}
            >
              <Image
                source={{
                  uri: "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png",
                }}
                style={{
                  height: 45,
                  width: 162,
                  marginTop: 20,
                }}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
