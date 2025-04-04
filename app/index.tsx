import { useNotification } from "@/contex/NotificationsContex";
import {
  registerForPushNotificationsAsync,
  sendPushTokenToServer,
} from "@/utils/registerForPushNotificationsAsync";

import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export async function getUniqueDeviceId() {
  let id = await AsyncStorage.getItem("device_id");
  if (!id) {
    id = uuid.v4().toString();
    await AsyncStorage.setItem("device_id", id);
  }
  return id;
}

export default function Index() {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const setupPush = async () => {
      try {
        const uniqueId = await getUniqueDeviceId();
        setUserId(uniqueId); // state'e kaydet

        const token = await registerForPushNotificationsAsync();
        await sendPushTokenToServer(uniqueId, token);
      } catch (err) {
        console.error("Bildirim kurulumu sırasında hata:", err);
      }
    };

    setupPush();
  }, []);

  const globalImage = require("../assets/images/global.png");
  const gameImage = require("../assets/images/game.png");

  const data = [
    {
      title: "KITA & ÜLKE KEŞFET",
      desc: "Kıtaları ve ülkeleri keşfedin",
      image: globalImage,
      bgColor: "bg-neutral-800",
      link: "country",
    },
    {
      title: "BAYRAK TAHMİN OYUNU",
      desc: "Bayrakları ülkelerle eşleştirin",
      image: gameImage,
      bgColor: "bg-red-600",
      link: "game",
    },
  ];

  const { notification, expoPushToken, error } = useNotification();

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4">
      <View className="flex-1 items-center justify-center bg-neutral-900 px-6">
        <Text className="text-white text-2xl font-bold mb-10">MOD SEÇ</Text>

        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="w-full mb-4"
            onPress={() => router.push(`/${item.link}` as any)}
          >
            <View
              className={`flex flex-row items-center ${item.bgColor} rounded-2xl p-5`}
            >
              <Image source={item.image} className="w-12 h-12 mr-4" />
              <View className="flex-1">
                <Text className="text-white text-base font-bold">
                  {item.title}
                </Text>
                <Text className="text-neutral-200 text-sm">{item.desc}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
