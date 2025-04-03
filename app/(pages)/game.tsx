import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import countryData from "../../assets/data.json";


interface Country {
  name: string;
  flag: string;
}

export default function Game(): JSX.Element {
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const position = useRef(new Animated.ValueXY()).current;

  // HighScore yükle
  useEffect(() => {
    const loadHighScore = async () => {
      const saved = await AsyncStorage.getItem("highScore");
      if (saved !== null) {
        setHighScore(parseInt(saved));
      }
    };
    loadHighScore();
    generateNewQuestion();
  }, []);

  const saveHighScore = async (newScore: number) => {
    await AsyncStorage.setItem("highScore", newScore.toString());
  };

  const generateNewQuestion = () => {
    const correct = countryData[Math.floor(Math.random() * countryData.length)];
    let wrong;
    do {
      wrong = countryData[Math.floor(Math.random() * countryData.length)];
    } while (wrong.name === correct.name);

    const randomized =
      Math.random() > 0.5 ? [correct, wrong] : [wrong, correct];
    setCurrentCountry(correct);
    setOptions(randomized);
    position.setValue({ x: 0, y: 0 });
    setFeedback("");
  };

  const handleAnswer = (selected: Country) => {
    const isCorrect = selected.name === currentCountry?.name;
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        saveHighScore(newScore);
      }
      setFeedback("✅ Correct");
    } else {
      setScore(0);
      setFeedback("❌ Wrong");
    }
    setTimeout(() => generateNewQuestion(), 800);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_: any, gesture: any) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (_: any, gesture: any) => {
      if (gesture.dx > 100) {
        handleAnswer(options[1]); // sağa kaydır
      } else if (gesture.dx < -100) {
        handleAnswer(options[0]); // sola kaydır
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  if (!currentCountry) return <></>;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#171717",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        Guess the Country
      </Text>

      <Text style={{ color: "#ccc", fontSize: 16 }}>Score: {score}</Text>
      <Text style={{ color: "#999", fontSize: 14, marginBottom: 16 }}>
        High Score: {highScore}
      </Text>

      {feedback !== "" && (
        <Text
          style={{
            color: feedback.startsWith("✅") ? "#22c55e" : "#ef4444",
            fontSize: 18,
            marginBottom: 16,
          }}
        >
          {feedback}
        </Text>
      )}

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            width: 260,
            height: 180,
            borderRadius: 16,
            backgroundColor: "#171717",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            elevation: 5,
            marginBottom: 32,
            transform: [{ translateX: position.x }],
          },
        ]}
      >
        <Image
          source={{ uri: currentCountry.flag }}
          style={{ width: 200, height: 130, resizeMode: "contain" }}
        />
      </Animated.View>

      <View
        style={{
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>{options[0].name}</Text>
        <Text style={{ color: "white", fontSize: 18 }}>{options[1].name}</Text>
      </View>

      <Text style={{ color: "#888", marginTop: 40 }}>
        Swipe left or right to answer
      </Text>
    </SafeAreaView>
  );
}
