import { View, Image, Pressable, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import StyledText from "~/components/StyledText";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { InfoIcon } from "lucide-react-native";
import { useRateLimit } from "~/hooks/useRateLimit";
import { useFirebaseUser } from "~/hooks/useFirebaseUser";

const Profile = () => {
  const { user } = useFirebaseUser();
  const [used, setUsed] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);
  let colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";
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

  useEffect(() => {
    if (user) {
      const starCountRef = database().ref(`/rate-limiter/${user.uid}`);
      starCountRef.on("value", (snapshot) => {
        let total = 0;
        snapshot.forEach((child) => {
          total += child.val();
        });
        setTotalUsed(total);
      });
    }

    return () => {
      if (user) {
        database().ref(`/rate-limiter/${user.uid}`).off("value");
      }
    };
  }, [user]);

  return (
    <View className="bg-white dark:bg-darkBlue">
      <View className="m-10 h-full">
        <Image
          source={{ uri: user.photoURL }}
          className="dark:border-2 dark:border-white/80"
          style={{
            width: 80,
            height: 80,
            alignSelf: "flex-end",
            borderRadius: 50,
          }}
        />
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            className="dark:text-white/80"
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Name:
          </StyledText>
          <StyledText
            style={{ textAlign: "center", fontSize: 15 }}
            className="dark:text-white/80"
          >
            {user.displayName}
          </StyledText>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Email:
          </StyledText>
          <StyledText style={{ textAlign: "center", fontSize: 15 }}>
            {user.email}
          </StyledText>
        </View>

        <View
          style={{
            borderBottomColor: "rgba(0,0,0,0.3)",
            borderBottomWidth: 0.4,
            marginTop: 20,
          }}
        />

        <StyledText
          style={{
            textAlign: "left",
            fontSize: 20,
            fontWeight: "600",
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          Usage Insights
        </StyledText>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Today's Usage:
          </StyledText>
          <StyledText style={{ textAlign: "center", fontSize: 15 }}>
            {RATE_LIMIT - used}/{RATE_LIMIT} questions left.
          </StyledText>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Lifetime Usage:
          </StyledText>
          <StyledText style={{ textAlign: "center", fontSize: 15 }}>
            {totalUsed} questions asked.
          </StyledText>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <StyledText
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Date Joined:
          </StyledText>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <StyledText style={{ textAlign: "center", fontSize: 15 }}>
              {new Date(user.metadata.creationTime).toDateString()}
            </StyledText>
            <StyledText
              className="dark:text-white/60 text-black/60"
              style={{
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {Math.floor(
                (new Date().getTime() -
                  new Date(user.metadata.creationTime).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              Days ago
            </StyledText>
          </View>
        </View>

        <StyledText
          className="text-black/60 dark:text-white/80"
          style={{
            textAlign: "left",
            fontSize: 12,
            marginTop: 40,
          }}
        >
          <InfoIcon
            size={10}
            color={darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"}
          />{" "}
          No information is shared publicly. All your chats are private.
        </StyledText>
        <View
          style={{
            flexGrow: 0.5,
          }}
        ></View>
        <Pressable onPress={async () => await auth().signOut()}>
          <StyledText
            className=" text-black/60 dark:text-white/80"
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop: "auto",
              alignSelf: "center",
              placeSelf: "flex-end",
            }}
          >
            Logout
          </StyledText>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
