import { View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import StyledText from "../components/StyledText";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { RATE_LIMIT } from "../utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";

const Profile = () => {
  const user = auth().currentUser;
  const [used, setUsed] = useState(0);
  const [totalUsed, setTotalUsed] = useState(0);

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
    <View className="p-10 bg-white h-full">
      <Image
        source={{ uri: user.photoURL }}
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
          style={{
            textAlign: "center",
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Name:
        </StyledText>
        <StyledText style={{ textAlign: "center", fontSize: 15 }}>
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
          {RATE_LIMIT - used}/{RATE_LIMIT} tokens left today.
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
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "rgba(0,0,0,0.6)",
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
        style={{
          textAlign: "left",
          fontSize: 12,
          marginTop: 40,
          color: "rgba(0,0,0,0.6)",
        }}
      >
        <FontAwesome5 name="info-circle" size={10} color="rgba(0,0,0,0.6)" /> No
        information is shared publicly. All your chats are private.
      </StyledText>
      <View
        style={{
          flexGrow: 1,
        }}
      ></View>
      <Pressable onPress={() => auth().signOut()}>
        <StyledText
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "rgba(0,0,0,0.6)",
            marginTop: "auto",
            alignSelf: "center",
            placeSelf: "flex-end",
          }}
        >
          Logout
        </StyledText>
      </Pressable>
    </View>
  );
};

export default Profile;
