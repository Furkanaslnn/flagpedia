// notifications.ts

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync(): Promise<string> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      throw new Error(
        "Permission not granted to get push token for push notification!"
      );
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;

    if (!projectId) {
      throw new Error("Project ID not found");
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    console.log("Expo Push Token:", token);
    return token;
  } else {
    throw new Error("Must use physical device for push notifications");
  }
}

export async function sendPushTokenToServer(userId: string, token: string) {
  try {
    const response = await fetch(
      "https://server-cjqd.onrender.com/api/push-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "j12inb321ASD890uhn2asD10eAS1km29e8120", // Backend'deki API key
        },
        body: JSON.stringify({
          userId,
          token,
        }),
      }
    );

    const result = await response.json();
    console.log("Push token gönderme sonucu:", result);
  } catch (err) {
    console.error("Push token gönderilirken hata:", err);
  }
}
