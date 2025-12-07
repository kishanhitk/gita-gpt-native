import { useEffect, useState } from "react";
import Button from "./Button";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { supabase } from "~/utils/supabase";

export const LoginWithGoogleButton = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // Get the users ID token from native Google Sign-In
    const signInResult = await GoogleSignin.signIn();
    // Handle both old and new google-signin library response structures
    const idToken = (signInResult as any)?.data?.idToken ?? (signInResult as any)?.idToken;

    if (!idToken) {
      throw new Error("No ID token returned from Google Sign-In");
    }

    // Sign in with Supabase using the Google ID token
    const { error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error) {
      throw error;
    }
  }

  return (
    <Button
      isLoading={loading}
      iconSrc={require("../../assets/google-logo.png")}
      title="Continue with Google"
      style={{
        width: "100%",
      }}
      className="w-full my-10"
      onPress={() => {
        setLoading(true);
        Haptics.selectionAsync();
        onGoogleButtonPress()
          .then(() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace("/");
          })
          .catch((error) => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            console.error("Error signing in with Google", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    />
  );
};
