import { View, Image, Pressable, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import StyledText from "~/components/StyledText";
import { InfoIcon } from "lucide-react-native";
import { useSupabaseUser } from "~/hooks/useSupabaseUser";
import { supabase } from "~/utils/supabase";
import { EXPO_PUBLIC_API_BASE_URL } from "~/utils/constants";

interface UsageData {
  used: number;
  limit: number;
  totalUsed: number;
}

const Profile = () => {
  const { user, token } = useSupabaseUser();
  const [usageData, setUsageData] = useState<UsageData>({
    used: 0,
    limit: 5,
    totalUsed: 0,
  });
  const [loading, setLoading] = useState(true);
  let colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";

  useEffect(() => {
    const fetchUsageData = async () => {
      if (!user || !token) return;

      try {
        const response = await fetch(
          `${EXPO_PUBLIC_API_BASE_URL}/mobile-usage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsageData({
            used: data.todayUsage ?? 0,
            limit: data.dailyLimit ?? 5,
            totalUsed: data.totalUsage ?? 0,
          });
        }
      } catch (error) {
        console.error("Error fetching usage data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, [user, token]);

  if (!user) return null;

  // Supabase user metadata
  const photoURL = user.user_metadata?.avatar_url ?? user.user_metadata?.picture;
  const displayName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? "User";
  const email = user.email ?? "";
  const createdAt = user.created_at ? new Date(user.created_at) : new Date();

  return (
    <View className="bg-white dark:bg-darkBlue">
      <View className="m-10 h-full">
        <Image
          source={{ uri: photoURL }}
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
            {displayName}
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
            {email}
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
            {loading ? "..." : `${usageData.limit - usageData.used}/${usageData.limit} questions left.`}
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
            {loading ? "..." : `${usageData.totalUsed} questions asked.`}
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
              {createdAt.toDateString()}
            </StyledText>
            <StyledText
              className="dark:text-white/60 text-black/60"
              style={{
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {Math.floor(
                (new Date().getTime() - createdAt.getTime()) /
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
        <Pressable onPress={() => supabase.auth.signOut()}>
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
