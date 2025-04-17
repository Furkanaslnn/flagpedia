import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  export default function Contact() {
    return (
      <SafeAreaView className="flex-1 bg-neutral-900">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View className="items-center mb-6">
            <Text className="text-white text-2xl mb-2">İletişim</Text>
            <Text className="text-white mb-5 text-center">
              Bizimle iletişime geçmek için aşağıdaki bilgilerden bize
              ulaşabilirsiniz:
            </Text>
            <Text className="text-white mb-10">📧 E-posta: orangehatx@gmail.com</Text>
          </View>
  
          <View>
            <Text className="text-white text-xl mb-2">Gizlilik Politikası</Text>
            <Text className="text-white text-base mb-2">
              Uygulamamız kullanıcı gizliliğine büyük önem vermektedir. Bu kapsamda:
            </Text>
            <Text className="text-white text-base mb-1">• Herhangi bir kişisel veri toplamamaktayız.</Text>
            <Text className="text-white text-base mb-1">• Uygulama içinde yalnızca bilgi amaçlı içerikler yer almaktadır.</Text>
            <Text className="text-white text-base mb-1">
              • Üçüncü taraf servisler (örn. Google Analytics) üzerinden anonim kullanıcı
              davranışı toplanıyor olabilir.
            </Text>
            <Text className="text-white text-base mb-2">
              Daha fazla bilgi için bizimle iletişime geçebilirsiniz.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  