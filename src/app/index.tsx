import { StatusBar } from "expo-status-bar";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import StyledText from "../components/StyledText";
import clsx from "clsx";

import React from "react";
import { commonQuestions } from "../utils/constants";

export default function App() {
  return (
    <View className="flex-1 bg-white items-center justify-center mx-5 flex-col h-screen ">
      <StyledText className="text-4xl">Gita GPT</StyledText>
      <StyledText
        style={{
          fontWeight: "300",
        }}
        className="text-lg dark:text-white/80 mt-5 text-center"
      >
        Find solace in the wisdom of
      </StyledText>
      <StyledText
        style={{
          fontWeight: "500",
        }}
        className="my-2 text-xl"
      >
        Shree Krishna 🦚
      </StyledText>
      <StyledText
        style={{
          fontWeight: "300",
        }}
        className="text-sm dark:text-white/40 mt-4 text-center"
      >
        11,56,973+ Updesh generated so far
      </StyledText>
      <View className="flex flex-col justify-center my-10">
        <StyledText className="text-md text-gray-900 mb-2 font-medium dark:text-white/90">
          Arjuna, what troubles you, my friend?
        </StyledText>
        <TextInput
          placeholder="How can I find inner peace in the midst of chaos?"
          className={clsx(
            "text-md rounded-md border border-gray-100 bg-gray-100 px-4 py-2 text-black",
            "dark:border-none dark:bg-white/10 dark:text-white"
          )}
          multiline
          numberOfLines={2}
        />

        <Button title="Ask Krishna" />

        <StyledText className="mt-5 -mb-2 dark:text-white/80">
          Or, try one of these
        </StyledText>
        <View
          style={{
            height: 50,
          }}
        >
          <ScrollView horizontal>
            {commonQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                className="h-10 mt-4 mr-2 shrink-0 rounded-full border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 dark:border-none dark:bg-black/30 dark:text-white/80"
              >
                <StyledText>{question}</StyledText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
