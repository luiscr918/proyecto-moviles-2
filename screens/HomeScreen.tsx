import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { homeStyle } from "../styles/homeStyle";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const nombre = "Luis";
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={homeStyle.container}
      >
        <View style={homeStyle.content}>
          <Text style={homeStyle.title}>¡Hola, {nombre}!</Text>

          <Text style={homeStyle.intro}>
            Gestiona y haz crecer tu emprendimiento desde un solo lugar.
          </Text>

          <View style={homeStyle.imageWrapper}>
            <Image
              source={require("../assets/imgs/logoStartUpsPartners.jpeg")}
              style={homeStyle.image}
              resizeMode="cover"
            />
          </View>

          <Text style={homeStyle.quote}>
            "Cree en ti. Cada gran negocio empezó con una pequeña idea."
          </Text>

          <Text style={homeStyle.motivationalText}>
            Hoy es el mejor día para impulsar tu emprendimiento.
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(CommonActions.navigate({ name: "My Space" }))
            }
            style={homeStyle.button}
          >
            <Text style={homeStyle.buttonText}>Explorar mi espacio</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
