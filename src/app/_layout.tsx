import "../global.css";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, View, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import auth from "@react-native-firebase/auth";
import StyledText from "../components/StyledText";

export default function Layout() {
  let [fontsLoaded, fontError] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{}}
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
                }}
              >
                <Image
                  source={require("../../assets/icon.png")}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
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
            drawerLabelStyle: styles.drawerLabelStyle,
            drawerContentStyle: styles.drawerContentStyle,
            drawerItemStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
          }}
        />
        <Drawer.Screen
          name="login"
          options={{
            title: "",
            drawerItemStyle: { display: "none" },
            headerShown: false,
            swipeEnabled: false,
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
  drawerContentStyle: {
    backgroundColor: "white",
  },
});
