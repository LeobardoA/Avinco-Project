import React from "react";
import { Image, Text, View, StyleSheet, Share } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalColors } from "../theme/GlobalTheme";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getHTML, setHTML } from "../components/DatabaseManager";

export const Home = (props: any) => {
  const printToFile = async () => {
    const html: any = getHTML();
    // await Print.printAsync({ html });
    const { uri } = await Print.printToFileAsync({ html });
    const lastUri : any = await setHTML("prueba1.pdf", uri);
    const opcionesCompartir = { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Compartir Archivo'};
    await shareAsync(lastUri, opcionesCompartir);
  };
  return (
    <View
      style={{
        backgroundColor: GlobalColors.white,
        flex: 1,
      }}
    >
      <View style={styles.header}>
        <Image
          source={require("../images/logo.png")}
          style={{ width: 80, height: 80, marginRight: 5 }}
        />
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: GlobalColors.accent,
            marginLeft: 5,
          }}
        >
          AVINCO
        </Text>
      </View>
      <LinearGradient
        colors={[GlobalColors.primary, "transparent"]}
        style={{ left: 0, right: 0, height: 40, margin: -25 }}
      />
      {/* CONTENT */}
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={printToFile}
          // onPress={() => props.navigation.navigate("History")}
          style={styles.btnHome}
        >
          <Image
            source={require("../images/serviceSheet.jpg")}
            resizeMode="stretch"
            style={{
              width: "90%",
              marginTop: "5%",
              height: "60%",
              borderRadius: 15,
            }}
          />
          <Text
            style={{
              marginHorizontal: "5%",
              width: "90%",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Nueva Hoja De Servicio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ToolsChecker")}
          style={styles.btnHome}
        >
          <Image
            source={require("../images/toolsList.jpeg")}
            resizeMode="stretch"
            style={{
              width: "90%",
              marginTop: "5%",
              height: "60%",
              borderRadius: 15,
            }}
          />
          <Text
            style={{
              marginHorizontal: "5%",
              width: "90%",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Lista Herramientas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    backgroundColor: GlobalColors.primary,
    height: "20%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnHome: {
    height: 200,
    elevation: 3,
    backgroundColor: GlobalColors.whiteElement,
    borderRadius: 15,
    width: 350,
    alignItems: "center",
  },
});
