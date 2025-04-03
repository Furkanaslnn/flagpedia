import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface Country {
  name: string;
  flag: string;
}

export interface CountryDetailType {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  coordinates: { latitude: number; longitude: number };
  borders: string[];
  timezones: string[];
  currency: string;
  languages: string[];
  flag: string;
}

export default function CountryList() {
  const [countries, setCountries] = useState<CountryDetailType[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<
    CountryDetailType[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [flagsLoaded, setFlagsLoaded] = useState<{ [key: string]: boolean }>(
    {}
  );

  const router = useRouter();

  useEffect(() => {
    fetch("https://countries-api-abhishek.vercel.app/countries")
      .then((res) => res.json())
      .then((json) => {
        const filtered = json.data.filter(
          (country: CountryDetailType) =>
            country.name.toLowerCase() !== "xenocera"
        );
        setCountries(filtered);
        setFilteredCountries(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleFlagLoad = (name: string) => {
    setFlagsLoaded((prev) => ({ ...prev, [name]: true }));
  };

  const handleClick = (country: CountryDetailType) => {
    router.push({
      pathname: "/country-detail",
      params: {
        name: country.name,
        capital: country.capital,
        region: country.region,
        subregion: country.subregion,
        population: country.population.toString(),
        area: country.area.toString(),
        latitude: country.coordinates.latitude.toString(),
        longitude: country.coordinates.longitude.toString(),
        borders: JSON.stringify(country.borders),
        timezones: JSON.stringify(country.timezones),
        currency: country.currency,
        languages: JSON.stringify(country.languages),
        flag: country.flag,
      },
    });
  };

  const renderItem = ({ item }: { item: CountryDetailType }) => (
    <TouchableOpacity
      className="flex-row items-center bg-neutral-800 p-3 rounded-lg mb-2"
      onPress={() => handleClick(item)}
    >
      <View
        style={{
          width: 30,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!flagsLoaded[item.name] && (
          <ActivityIndicator size="small" color="#fff" />
        )}
        <SvgUri
          uri={item.flag}
          width={30}
          height={20}
          onLoad={() => handleFlagLoad(item.name)}
        />
      </View>
      <Text className="text-white text-lg ml-3 font-semibold">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4">
      <View className="flex-1 bg-neutral-900 px-4 pt-12">
        <Text className="text-white text-xl mb-4 text-center font-bold">
          SELECT A COUNTRY
        </Text>

        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search countries..."
          placeholderTextColor="#aaa"
          style={{
            backgroundColor: "#202020",
            padding: 10,
            borderRadius: 8,
            color: "white",
            marginBottom: 16,
          }}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <FlatList
            data={filteredCountries}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={renderItem}
            initialNumToRender={15}
            maxToRenderPerBatch={20}
            windowSize={10}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
