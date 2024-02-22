import { useEffect, useState } from "react";
import Button from "./Button";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";

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
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
        onGoogleButtonPress()
          .then(() => {
            console.log("Signed in with Google!");
            router.push("/");
          })
          .catch((error) => {
            console.error("Error signing in with Google", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    />
  );
};
