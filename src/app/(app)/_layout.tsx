import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  StyleSheet,
  View,
  Image,
  useColorScheme,
  Pressable,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import auth from "@react-native-firebase/auth";
import StyledText from "../../components/StyledText";
import { Redirect, router } from "expo-router";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";

export default function Layout() {
  let colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";
  const { user, initializing } = useFirebaseUser();

  if (initializing) {
    return <StyledText>Loading...</StyledText>;
  }

  if (!user) {
    return <Redirect href="login" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerType: "slide",
          drawerActiveBackgroundColor: "rgba(0,0,0,0.1)",
          headerTitleStyle: {
            fontFamily: "Quicksand_600SemiBold",
          },
          headerStyle: {
            elevation: 0,
            backgroundColor: darkMode ? "rgba(52, 46, 84, 1)" : "white",
          },
          headerTintColor: darkMode ? "white" : "black",
          drawerStyle: {
            backgroundColor: darkMode ? "rgba(52, 46, 84, 1)" : "white",
          },
          drawerLabelStyle: darkMode
            ? styles.drawerLabelStyleDark
            : styles.drawerLabelStyle,
          headerRight: () => {
            if (user) {
              return (
                <Pressable
                  onPress={() => {
                    router.push("profile");
                  }}
                  style={{
                    marginRight: 20,
                  }}
                >
                  <Image
                    source={{ uri: user.photoURL }}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 20,
                      backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                  />
                </Pressable>
              );
            } else {
              return null;
            }
          },
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View
                style={{
                  padding: 20,
                  marginVertical: 20,
                  borderBottomWidth: 0.4,
                  borderBottomColor: "rgba(0,0,0,0.2)",
                  backgroundColor: darkMode ? "rgba(52, 46, 84, 1)" : "white",
                }}
              >
                <Image
                  source={require("../../../assets/icon.png")}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: "center",
                    borderRadius: 50,
                  }}
                />
                <StyledText
                  style={{
                    fontWeight: "600",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                >
                  Gita GPT
                </StyledText>
              </View>

              <DrawerItemList {...props} />
              <View style={{ marginTop: "auto" }}>
                <DrawerItem label="Logout" onPress={() => auth().signOut()} />
              </View>
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "",
            drawerContentStyle: styles.drawerContentStyle,
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerContentStyle: styles.drawerContentStyle,
            headerRight: () => {
              return null;
            },
          }}
        />
        <Drawer.Screen
          name="chat"
          options={{
            drawerLabel: "Chat",
            title: "Chat",
            drawerContentStyle: styles.drawerContentStyle,
            headerRight: () => {
              return null;
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerLabelStyle: {
    fontFamily: "Quicksand_500Medium",
    color: "black",
  },
  drawerLabelStyleDark: {
    fontFamily: "Quicksand_500Medium",
    color: "white",
  },
  drawerContentStyle: {
    backgroundColor: "white",
  },
});
