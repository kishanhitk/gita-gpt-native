import { useState } from "react";
import { useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const useFirebaseUser = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(
    auth().currentUser
  );

  const [initializing, setInitializing] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const getToken = async () => {
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
    getToken().then((token) => {
      setToken(token);
    });
  }, [user]);

  return { user, initializing, token };
};
