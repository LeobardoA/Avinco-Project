import React from "react";
import { Image, Text, View, StyleSheet, Share } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalColors } from "../theme/GlobalTheme";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';

async function generateHTML() {
  const asset = Asset.fromModule(require('../images/logo.png'));
  const image = await manipulateAsync(asset.localUri ?? asset.uri, [], { base64: true });
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Reporte De Servicio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
  </head>
  <body>
    <div class="hoja-a4">
      <!-- CONTENIDO -->
      <div class="container">
        <!-- HEADER -->
        <div class="header">
          <!-- Logo -->
          <div
            style="
              flex-direction: row;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 6cm;
              height: 2cm;
            "
          >
            <img
              src="data:image/png;base64,${image.base64}"
              style="width: 2cm; height: 2cm; margin-right: 0.2cm"
            />
            <div
              style="
                display: flex;
                flex-direction: column;
                height: 2cm;
                justify-content: center;
              "
            >
              <p
                style="
                  color: #ff8800;
                  font-size: 2em;
                  margin: 0;
                  font-weight: bold;
                "
              >
                AVINCO
              </p>
              <p
                style="
                  color: #3949ab;
                  font-size: 0.6em;
                  margin: 0;
                  font-weight: bold;
                "
              >
                AVI, Instalaciones Climáticas de Occidente S de R.L. de CV.
              </p>
            </div>
          </div>
        </div>
        <!-- SERVICES -->
        <div class="services">
          <h1>SERVICES</h1>
        </div>
        <!-- FOOTER -->
        <div class="footer">
          <h1>FOOTER</h1>
        </div>
      </div>
      <!-- TRIANGULOS [NO TOCAR] -->
      <div class="tl_triangle">
        <div class="tl_triangle_border"></div>
      </div>
      <div class="br_triangle">
        <div class="br_triangle_border"></div>
      </div>
    </div>
  </body>
</html>
`;
}

export const Home = (props: any) => {
  const printToFile = async () => {
    console.log(generateHTML);
    const html = await generateHTML();
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
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
