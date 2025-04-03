import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css"; // Tailwind ya da global stil dosyan

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#171717" translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
