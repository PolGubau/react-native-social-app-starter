import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { CustomButton } from "../../components";
import { SafeAreaView, ScrollView, Text, View } from "../../api/elements";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Bookmark() {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Bookmarks</Text>
        {/* <Text>Title: {notification?.request?.content.title} </Text> */}
        <CustomButton
          containerStyles="mt-10"
          title="Toc toc 🥶"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¿Quién es? 🤔",
      body: "no sé",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
}
