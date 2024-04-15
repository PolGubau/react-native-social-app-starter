import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center flex gap-1">
      <Image
        source={icon}
        resizeMethod="contain"
        tintColor={color}
        className={`w-6 h-6`}
      />
      <Text
        className={`text-xs ${focused ? "font-psemibold" : "font-pregular"}`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          height: 74,
          borderTopWidth: 1,
          borderTopColor: "#232533",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          titiel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                icon={icons.home}
                color={color}
                name={"Home"}
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          titiel: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name={"Bookmark"}
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          titiel: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                icon={icons.plus}
                color={color}
                name={"Create"}
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          titiel: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                icon={icons.profile}
                color={color}
                name={"Profile"}
                focused={focused}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
