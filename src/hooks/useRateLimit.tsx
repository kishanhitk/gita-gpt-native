import { useState, useEffect } from "react";
import database from "@react-native-firebase/database";

export const useRateLimit = () => {
  const [rateLimit, setRateLimit] = useState(0);

  useEffect(() => {
    const starCountRef = database().ref("/CONFIG/MOBILE_API_RATE_LIMIT");
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setRateLimit(data);
    });

    return () => {
      database().ref("/CONFIG/MOBILE_API_RATE_LIMIT").off("value");
    };
  }, []);

  return rateLimit;
};
