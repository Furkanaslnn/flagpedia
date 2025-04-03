import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css"; // Tailwind ya da global stil dosyan

import * as SystemUI from "expo-system-ui";

// Navigation bar rengini değiştir
SystemUI.setBackgroundColorAsync("#171717"); // örneğin beyaz

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#171717" translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
