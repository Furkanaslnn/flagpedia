import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Contact() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-2xl mb-2">İletişim</Text>
        <Text className="text-white mb-5">
          Bizimle iletişime geçmek için aşağıdaki bilgilerden bize
          ulaşabilirsiniz:
        </Text>

        <Text className="text-white">📧 E-posta: orangehatx@gmail.com</Text>
      </View>
    </SafeAreaView>
  );
}
