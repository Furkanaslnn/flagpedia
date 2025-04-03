import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryItem from "../components/CountryItem"; // yolunu projenin yapısına göre değiştir

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
  const renderFooter = () => {
    return (
      <View style={{ paddingVertical: 16 }}>
        <ActivityIndicator size="small" color="#aaa" />
      </View>
    );
  };
  const [showFooter, setShowFooter] = useState(false);

  const handleEndReached = () => {
    // Eğer zaten gösteriliyorsa tekrar göstermeyelim
    if (!showFooter) {
      setShowFooter(true);
      // Simüle edilmiş gecikme — gerçek pagination varsa buraya fetch eklersin
      setTimeout(() => {
        setShowFooter(false);
      }, 1000);
    }
  };

  const router = useRouter();

  useEffect(() => {
    fetch("https://countries-api-abhishek.vercel.app/countries")
      .then((res) => res.json())
      .then((json) => {
        // Xenocera'yı atla
        const filteredRaw = json.data.filter(
          (country: CountryDetailType) =>
            country.name.toLowerCase() !== "xenocera"
        );

        // Aynı isimdeki ülkeleri sadece bir kez al
        const seen = new Set();
        const uniqueCountries = filteredRaw.filter(
          (country: CountryDetailType) => {
            const normalizedName = country.name.trim().toLowerCase();
            if (seen.has(normalizedName)) return false;
            seen.add(normalizedName);
            return true;
          }
        );

        setCountries(uniqueCountries);
        setFilteredCountries(uniqueCountries);
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

  const renderItem = useCallback(
    ({ item }: { item: CountryDetailType }) => (
      <CountryItem
        item={item}
        onPress={() => handleClick(item)}
        onFlagLoad={() => handleFlagLoad(item.name)}
        flagLoaded={flagsLoaded[item.name]}
      />
    ),
    [flagsLoaded]
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 px-4 pt-5">
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
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          ListFooterComponent={showFooter ? renderFooter : null}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3} // %30 altına geldiğinde tetikler
        />
      )}
    </SafeAreaView>
  );
}
