import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const continents = [
  { name: "Africa", image: require("../../assets/images/africa.png") },
  { name: "Asia", image: require("../../assets/images/asia.png") },
  { name: "Europe", image: require("../../assets/images/europe.png") },
  { name: "Oceania", image: require("../../assets/images/oceania.png") },
  {
    name: "North America",
    image: require("../../assets/images/north-america.png"),
  },
  {
    name: "South America",
    image: require("../../assets/images/south-america.png"),
  },
];

export default function Discover() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4">
      <ScrollView className="flex-1 bg-neutral-900 px-4 pt-10">
        <Text className="text-white text-2xl font-bold mb-6">
          Select a Continent
        </Text>

        {continents.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="bg-neutral-800 rounded-xl p-4 mb-4 flex-row items-center"
          >
            <Image
              source={item.image}
              className="w-20 h-20 mr-4"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">
                {item.name}
              </Text>
              <View className="h-[1.5px] bg-red-500 mt-1 w-full" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
