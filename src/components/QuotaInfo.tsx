import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import StyledText from "./StyledText";
import { useRateLimit } from "../hooks/useRateLimit";

const QuotaInfo = () => {
  const user = auth().currentUser;
  const [used, setUsed] = useState(0);
  const RATE_LIMIT = useRateLimit();

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];

    if (user) {
      const starCountRef = database().ref(`/rate-limiter/${user.uid}/${date}`);
      starCountRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setUsed(data);
      });
    }

    return () => {
      if (user) {
        database().ref(`/rate-limiter/${user.uid}/${date}`).off("value");
      }
    };
  }, [user]);

  return user ? (
    <StyledText className="mt-2 text-right text-sm font-light dark:text-white/60">
      {RATE_LIMIT - used}/{RATE_LIMIT} questions left.
    </StyledText>
  ) : null;
};

export default QuotaInfo;
