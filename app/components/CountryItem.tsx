// components/CountryItem.tsx

import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SvgUri } from "react-native-svg";

const CountryItem = React.memo(
  ({
    item,
    onPress,
    onFlagLoad,
    flagLoaded,
  }: {
    item: any;
    onPress: () => void;
    onFlagLoad: () => void;
    flagLoaded: boolean;
  }) => (
    <TouchableOpacity
      className="flex-row items-center bg-neutral-800 p-3 rounded-lg mb-2"
      onPress={onPress}
    >
      <View
        style={{
          width: 30,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!flagLoaded && <ActivityIndicator size="small" color="#fff" />}
        <SvgUri uri={item.flag} width={30} height={20} onLoad={onFlagLoad} />
      </View>
      <View>
        <Text className="text-white text-lg ml-3 font-semibold">
          {item.name}
        </Text>
        <View className="flex-row">
          <Text className="text-white text-sm ml-3 font-light">
            {item.region}
          </Text>
          <Text className="text-white text-sm ml-3">-</Text>
          <Text className="text-white text-sm ml-3 font-light">
            {item.subregion}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
);

export default CountryItem;
