import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import clsx from "clsx";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  PermissionsAndroid,
  Pressable,
  ScrollView,
  Share,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Button from "../components/Button";
import QuotaInfo from "../components/QuotaInfo";
import StyledText from "../components/StyledText";
import {
  EXPO_PUBLIC_API_BASE_URL,
  commonQuestions,
  storedCachedAnswers,
} from "../utils/constants";
import { Play, Send, Share2Icon, Volume2, VolumeX } from "lucide-react-native";

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
  let colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";

  useEffect(() => {
    AsyncStorage.getItem("isMuted")
      .then((value) => {
        if (value === null) {
          return;
        }
        setIsMuted(value === "true");
      })
      .catch((error) => {
        console.error("Error getting isMuted from AsyncStorage", error);
      });
  }, []);

  async function playSound() {
    if (sound) {
      return;
    }
    const { sound: createdSound } = await Audio.Sound.createAsync(
      require("../../assets/flute.mp3")
    );
    await createdSound.setVolumeAsync(0.5);
    setSound(createdSound);
    await createdSound.playAsync();
  }

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the notification");
        } else {
          console.log("Notification permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermission();
  }, []);

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
    if (!contentInput) {
      return;
    }
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
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      setResultText("");
      if (error.response?.data?.message === "Too Many Requests") {
        setError(
          "You have reached the maximum number of requests for today. Please try again tomorrow."
        );
      } else {
        setError(
          "Something went wrong. Please try again later. If the problem persists, please let the developer know."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (initializing) return null;

  return (
    <View className="bg-white dark:bg-darkBlue h-full ">
      <Pressable
        onPress={async () => {
          Haptics.selectionAsync();
          setIsMuted(!isMuted);
          await AsyncStorage.setItem("isMuted", (!isMuted).toString());
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
        style={{
          position: "absolute",
          bottom: 30,
          right: 25,
          zIndex: 5,
          borderRadius: 50,
          padding: 20,
          backgroundColor: darkMode ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          elevation: 3,
        }}
      >
        {!isMuted ? (
          <Volume2 size={20} color="white" />
        ) : (
          <VolumeX size={20} color="white" />
        )}
      </Pressable>
      <ScrollView
        style={{
          marginTop: 96,
        }}
      >
        <View className="mx-5 mb-52 flex-1 flex-col items-center justify-center relative">
          <StyledText className="text-4xl dark:text-white">Gita GPT</StyledText>
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
            className="my-2 text-xl dark:text-white/80"
          >
            Shree Krishna 🦚
          </StyledText>
          <StyledText
            style={{
              fontWeight: "300",
            }}
            className="mt-4 text-center text-sm dark:text-white/70"
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
              style={{
                fontFamily: "Quicksand_400Regular",
              }}
              placeholder="How can I find inner peace in the midst of chaos?"
              className={clsx(
                "text-md rounded-md border border-gray-100  bg-gray-100 px-4 py-2 text-black",
                "dark:border-0 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
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
                Haptics.selectionAsync();
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
                    onPress={async () => {
                      setContentInput(question);
                      await Haptics.selectionAsync();
                    }}
                    key={index}
                    className="mr-2 mt-4 h-10 shrink-0 rounded-full border border-gray-100 bg-gray-200 px-4 py-2 text-sm  text-gray-900 dark:border-0 dark:bg-black/30 "
                  >
                    <StyledText
                      style={{
                        fontWeight: "600",
                      }}
                      className="dark:text-white/80"
                    >
                      {question}
                    </StyledText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          {resultText && (
            <View className="w-full">
              <View className="relative rounded-lg rounded-b-none border border-gray-50 bg-gray-100 p-5 pb-10 dark:border-0 dark:bg-black/30 dark:text-white/90">
                <StyledText>{resultText}</StyledText>
                <StyledText className="absolute right-0">
                  - Krishna 🦚
                </StyledText>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  Haptics.selectionAsync();
                  Share.share({
                    message: `Arjuna: ${contentInput}\n\nKrishna 🦚: ${resultText}\n\n\n\nAsk Krishna for guidance: https://gita.kishans.in/android`,
                  });
                }}
                className="w-full flex gap-3 py-3 px-5 bg-gray-50 dark:bg-white/10 flex-row items-center rounded-lg border-t-0  rounded-t-none border-[0px] border-gray-800 dark:border-0"
              >
                <StyledText
                  style={{
                    fontWeight: "500",
                  }}
                >
                  Share this wisdom with your friends and family
                </StyledText>
                <Share2Icon
                  size={20}
                  color={darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"}
                />
              </TouchableOpacity>
            </View>
          )}
          {error && (
            <View className="rounded-md border border-red-400 bg-red-100 p-5 w-full mt-5 dark:border-0 dark:bg-red-500/10 dark:text-red-500">
              <StyledText className="text-red-500 dark:text-red-400">
                {error}
              </StyledText>
            </View>
          )}
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </View>
  );
}
