import { useState } from "react";
import { TouchableOpacity, ActivityIndicator, Text, StyleSheet } from "react-native";
import { supabase } from "~/utils/supabase";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

export const LoginAnonymousButton = () => {
  const [loading, setLoading] = useState(false);

  async function onAnonLogin() {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      throw error;
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      disabled={loading}
      onPress={() => {
        setLoading(true);
        Haptics.selectionAsync();
        onAnonLogin()
          .then(() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace("/");
          })
          .catch((error) => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            console.error("Error with anonymous login", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    >
      {loading ? (
        <ActivityIndicator color="#666" />
      ) : (
        <Text style={styles.text}>Continue as Guest (Test)</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  text: {
    color: "#666",
    fontSize: 16,
    fontFamily: "Quicksand_500Medium",
  },
});
