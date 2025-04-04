import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css"; // Tailwind ya da global stil dosyan
import { NotificationProvider } from "@/contex/NotificationsContex";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  return (
    <NotificationProvider>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#171717" translucent />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </NotificationProvider>
  );
}
