import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { GlobalColors } from '../../theme/GlobalTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { Picker } from '@react-native-picker/picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const ToolsChecker = () => {

    const mantenimientoList = ["Caja de Herramientas", "Multimetro", "Asperzor", "Hidrolavadora", "Manguera verde", "Extension Electrica", "Franelas", "Manometros", "Escaleras", "Cinta gris", "Bolsa de Plastico", "Aspiradora", "Adaptador 410", "Control Remoto", "Contactor 220V", "Cinchos", "Kit de Arranque", "Casco y Chaleco"];
    const instalacionList = ["Nivel", "Taladro", "Brocas", "Escaleras", "Cinta Gris", "Abrazaderas de tuberia", "Lapiz y Marcador", "Bomba de Vario","Extension Electrica", "Manometros", "Pericas", "Cinseles, Marro y Martillo", "Pistola de Temperatura", "Terminales Electricas", "Pedacera de Armaflex", "Plantillas para Instalacion", "Cemento"];

    const [selectedValue, setSelectedValue] = useState('Mantenimiento'); // Estado para el valor seleccionado del Picker
    const dataList = selectedValue === 'Mantenimiento' ? mantenimientoList : instalacionList; // Determinar qué lista mostrar

    const [checkboxStates, setCheckboxStates] = useState<boolean[]>(Array(dataList.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
    };

    const checkTools = () => {
        let missingTools: string[] = [];
        checkboxStates.forEach((item, index) => {
            if (!item) {
                missingTools.push(dataList[index]);
                return;
            }
        });
        const missingToolsMessage = missingTools.join('\n');
        Alert.alert("Falta Herramienta", "Aun no has cargado:\n" + missingToolsMessage);
    }

    return (
        <View style={{
            backgroundColor: GlobalColors.white,
            flex: 1,
        }}>
            <View style={styles.header}>
                <Image source={require('../../images/logo.png')} style={{ width: 80, height: 80, marginRight: 5 }} />
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: GlobalColors.accent, marginLeft: 5 }}>AVINCO</Text>
            </View>
            <LinearGradient colors={[GlobalColors.primary, "transparent"]} style={{
                left: 0,
                right: 0,
                height: 40,
                margin: -25,
                flexDirection: 'row',
                justifyContent: 'center'
            }} >

                <View style={{
                    borderRadius: 15,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    elevation: 2
                }}>
                    <Picker
                        mode='dropdown'
                        style={{ fontWeight: "bold", fontSize: 10, width: 320 }}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label={'Mantenimiento'} value={'Mantenimiento'} key={0} />
                        <Picker.Item label={'Instalacion'} value={'Instalacion'} key={1} />
                    </Picker>
                </View>
            </LinearGradient>
            {/* CONTENT */}
            <ScrollView style={{
                flex: 1,
                marginTop: 35
            }}>
                {dataList.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => handleCheckboxChange(index)}>
                        <Text>{item}</Text>
                        <FontAwesome name={checkboxStates[index] ? 'check-square' : 'square-o'} size={30} color={GlobalColors.primaryDarker} />
                    </TouchableOpacity>
                ))}
            </ScrollView >
            <View style={{
                bottom: 0,
                width: '100%',
                height: '9%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                elevation: 10,
                backgroundColor: GlobalColors.whiteElement
            }}>
                <TouchableOpacity style={{
                    width: 350,
                    height: 50,
                    backgroundColor: GlobalColors.accent,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    onPress={() => checkTools()}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Revisar</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default ToolsChecker;
const styles = StyleSheet.create({
    header: {
        paddingTop: 15,
        backgroundColor: GlobalColors.primary,
        height: '20%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        backgroundColor: GlobalColors.whiteElement,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        marginHorizontal: 15,
        borderRadius: 15,
        marginVertical: 8,
        elevation: 2
    },
    footerBtn: {
        width: 50,
        height: 50,
        backgroundColor: GlobalColors.accent,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
});