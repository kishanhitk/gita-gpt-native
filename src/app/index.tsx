import { StatusBar } from "expo-status-bar";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import StyledText from "../components/StyledText";
import clsx from "clsx";

import React, { FormEvent, useRef, useState } from "react";
import { commonQuestions, storedCachedAnswers } from "../utils/constants";
import { useRouter } from "expo-router";

export default function App() {
  const [contentInput, setContentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const afterResultTextRef = useRef<HTMLDivElement>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const API_ENABLED = true;
  const router = useRouter();

  const handleSubmit = async () => {
    if (audio?.paused) {
      audio.play();
      setIsPlaying(true);
    }
    setError("");
    const input = {
      contentInput,
    };
    setIsLoading(true);
    try {
      let stream;

      console.log("API_ENABLED", API_ENABLED);
      if (API_ENABLED) {
        const cachedAnswers = storedCachedAnswers[contentInput];

        if (cachedAnswers) {
          const randomAnswer =
            cachedAnswers[Math.floor(Math.random() * cachedAnswers.length)];

          console.log("randomAnswer", randomAnswer);
          stream = new ReadableStream({
            async start(controller) {
              console.log("Starting stream");
              const text = randomAnswer;
              for (let i = 0; i < text.length; i++) {
                console.log("text[i]", text[i]);
                await new Promise((r) => setTimeout(r, 40));
                controller.enqueue(new TextEncoder().encode(text[i]));
              }
              controller.close();
            },
          });
        } else {
          // Send the data to the server
          const response = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify(input),
          });
          // Check if the response is successful
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          // This data is a ReadableStream
          stream = response.body;
          if (!stream) {
            return;
          }
        }
      } else {
        stream = new ReadableStream({
          async start(controller) {
            let text = "";
            const cachedAnswers = storedCachedAnswers[contentInput];
            if (cachedAnswers) {
              const randomAnswer =
                cachedAnswers[Math.floor(Math.random() * cachedAnswers.length)];
              text = randomAnswer;
            } else {
              text = `Hare Krishna! \n The API is temporarily disabled for maintenance. Please try again after sometime. \n Enjoy the soothing Krishna flute in the meantime.`;
            }

            for (let i = 0; i < text.length; i++) {
              await new Promise((r) => setTimeout(r, 40));
              controller.enqueue(new TextEncoder().encode(text[i]));
            }
            controller.close();
          },
        });
      }

      setResultText("");

      console.log("Before getReader", stream);
      const reader = stream.getReader();
      console.log("After getReader", reader);
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResultText((prev) => prev + chunkValue);
        afterResultTextRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      setError(
        "You have reached the maximum number of requests for today. Please try again tomorrow."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        <StyledText
          className="text-md text-gray-900 mb-2 dark:text-white/90"
          style={{
            fontWeight: "500",
          }}
        >
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
          value={contentInput}
          onChangeText={(text) => setContentInput(text)}
        />

        <Button
          title="Ask Krishna"
          onPress={(e) => {
            handleSubmit();
          }}
        />

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
                onPress={() => {
                  setContentInput(question);
                }}
                key={index}
                className="h-10 mt-4 mr-2 shrink-0 rounded-full border border-gray-100 bg-gray-200 px-4 py-2 text-sm  text-gray-900 dark:border-none dark:bg-black/30 dark:text-white/80"
              >
                <StyledText
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {question}
                </StyledText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      {resultText && (
        <StyledText className="relative  mb-20 rounded-lg border border-gray-50 bg-gray-100 p-5  pb-10 dark:border-none dark:bg-black/30 dark:text-white/90">
          {resultText}
          <StyledText className="absolute bottom-2 right-8">
            - Krishna 🦚
          </StyledText>
        </StyledText>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
