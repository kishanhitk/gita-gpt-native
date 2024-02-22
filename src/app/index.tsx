import clsx from "clsx";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Button from "../components/Button";
import StyledText from "../components/StyledText";
import {
  EXPO_PUBLIC_API_BASE_URL,
  commonQuestions,
  storedCachedAnswers,
} from "../utils/constants";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import QuotaInfo from "../components/QuotaInfo";

export default function Index() {
  const [contentInput, setContentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const afterResultTextRef = useRef<HTMLDivElement>(null);
  const [showDonate, setShowDonate] = useState(false);
  const API_ENABLED = true;
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  async function playSound() {
    if (sound) {
      return;
    }
    const { sound: createdSound } = await Audio.Sound.createAsync(
      require("../../assets/flute.mp3")
    );
    setSound(createdSound);
    await createdSound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const getToken = async () => {
    const user = auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      return token;
    }
    return null;
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!initializing && !user) {
      router.push("/login");
    }
  }, [initializing, user]);

  const getRandomAnswerFromCache = () => {
    const cachedAnswers = storedCachedAnswers[contentInput];
    return cachedAnswers
      ? cachedAnswers[Math.floor(Math.random() * cachedAnswers.length)]
      : null;
  };

  const fetchAnswerFromAPI = async () => {
    const response = await axios.post(
      `${EXPO_PUBLIC_API_BASE_URL}/generate-mobile`,
      { contentInput },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    if (response.status !== 200) {
      console.error("API response error", response);
      throw new Error(
        response.data?.message || "Something went wrong with the API."
      );
    }

    return response.data?.message;
  };

  const handleSubmit = async () => {
    setError("");
    if (!isMuted) {
      playSound();
    }
    setIsLoading(true);

    try {
      let textResponse = getRandomAnswerFromCache();

      if (!textResponse && API_ENABLED) {
        textResponse = await fetchAnswerFromAPI();
      } else {
        textResponse =
          textResponse ||
          `Hare Krishna! The API is temporarily disabled for maintenance. Please try again later.`;
      }

      setResultText(textResponse);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "You have reached the maximum number of requests for today. Please try again tomorrow."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (initializing) return null;

  return (
    <ScrollView className="bg-white">
      <View className="mx-5 h-screen flex-1 flex-col items-center justify-center bg-white relative">
        {/* Mute Button */}
        <TouchableOpacity
          onPress={async () => {
            setIsMuted(!isMuted);
            if (isMuted) {
              if (sound) {
                await sound?.playAsync();
              } else {
                await playSound();
              }
            } else {
              await sound?.stopAsync();
            }
          }}
          className="absolute top-10 right-5"
        >
          {!isMuted ? (
            <FontAwesome5 name="volume-up" size={24} color="gray" />
          ) : (
            <FontAwesome5 name="volume-mute" size={24} color="gray" />
          )}
        </TouchableOpacity>
        <StyledText className="text-4xl">Gita GPT</StyledText>
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
          className="my-2 text-xl"
        >
          Shree Krishna 🦚
        </StyledText>
        <StyledText
          style={{
            fontWeight: "300",
          }}
          className="mt-4 text-center text-sm dark:text-white/40"
        >
          11,56,973+ Updesh generated so far
        </StyledText>
        <View className="my-10 flex flex-col justify-center">
          <StyledText
            className="text-md mb-2 text-gray-900 dark:text-white/90"
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

          <QuotaInfo />

          <Button
            isLoading={isLoading}
            title="Ask Krishna"
            onPress={(e) => {
              handleSubmit();
            }}
          />

          <StyledText className="-mb-2 mt-5 dark:text-white/80">
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
                  className="mr-2 mt-4 h-10 shrink-0 rounded-full border border-gray-100 bg-gray-200 px-4 py-2 text-sm  text-gray-900 dark:border-none dark:bg-black/30 dark:text-white/80"
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
          <View className="relative rounded-lg border border-gray-50 bg-gray-100 p-5  pb-10 dark:border-none dark:bg-black/30 dark:text-white/90">
            <StyledText>{resultText}</StyledText>
            <StyledText className="absolute right-0">- Krishna 🦚</StyledText>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
