import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SvgUri } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CountryDetail() {
  const [flagLoaded, setFlagLoaded] = useState(false);

  const params = useLocalSearchParams();

  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    latitude,
    longitude,
    borders,
    timezones,
    currency,
    languages,
    flag,
  } = params;

  const formatNumber = (numStr: string | undefined) => {
    if (!numStr) return "";
    return parseInt(numStr).toLocaleString("tr-TR");
  };

  const renderField = (label: string, value: string | string[]) => (
    <View className="bg-neutral-800 p-3 rounded-md mb-2">
      <Text className="text-neutral-400 text-xs mb-1">{label}</Text>
      <Text className="text-white text-sm">
        {Array.isArray(value) ? value.join(", ") : value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4">
      <ScrollView className="flex-1 bg-neutral-900 px-4 pt-12">
        <View className="items-center mb-6">
          {!flagLoaded && (
            <ActivityIndicator size="large" color="#ffffff" className="mb-4" />
          )}
          <SvgUri
            uri={flag as string}
            width={150}
            height={100}
            onLoad={() => setFlagLoaded(true)}
          />
          <Text className="text-white text-3xl font-bold mt-4">{name}</Text>
        </View>

        {renderField("Capital", capital as string)}
        {renderField("Region", region as string)}
        {renderField("Subregion", subregion as string)}
        {renderField("Population", formatNumber(population as string))}
        {renderField("Area", `${formatNumber(area as string)} km²`)}
        {renderField(
          "Coordinates",
          `${Number(latitude).toFixed(4)}° N, ${Number(longitude).toFixed(
            4
          )}° E`
        )}
        {renderField("Borders", JSON.parse(borders as string))}
        {renderField("Timezone", (JSON.parse(timezones as string) || [])[0])}
        {renderField("Currency", currency as string)}
        {renderField("Languages", JSON.parse(languages as string))}
      </ScrollView>
    </SafeAreaView>
  );
}
