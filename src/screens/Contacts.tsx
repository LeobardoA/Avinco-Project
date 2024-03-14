import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobalColors } from '../theme/GlobalTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { readFile } from '../components/DatabaseManager';
import Cliente from '../components/Cliente';
import { useFocusEffect } from '@react-navigation/native';

export const Contacts = (props: any) => {

    const [clientes, setClientes] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                let clientesData = await readFile("clientes.txt");
                if (!clientesData) {
                    return;
                }
                setClientes(clientesData);
            };
            fetchData();
        }, [])
    );

    return (
        <View style={{
            backgroundColor: GlobalColors.white,
            flex: 1,
        }}>
            <View style={styles.header}>
                <Image source={require('../images/logo.png')} style={{ width: 80, height: 80, marginRight: 5 }} />
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: GlobalColors.accent, marginLeft: 5 }}>AVINCO</Text>
            </View>
            <LinearGradient colors={[GlobalColors.primary, "transparent"]} style={{
                left: 0,
                right: 0,
                height: 40,
                margin: -25,
                flexDirection: 'row',
                justifyContent: 'center'
            }} />
            {/* CONTENT */}
            <ScrollView style={{
                flex: 1,
                marginTop: 25,
            }}>
                {clientes.map((cliente: Cliente, index) => (
                    <View style={styles.contactContainer} key={index}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{cliente.alias}</Text>
                            {cliente.alias !== cliente.nombre ? <Text>{cliente.nombre}</Text> : null}
                            <Text>{cliente.domicilio}</Text>
                            <Text>{cliente.telefono}</Text>
                            <Text>{cliente.correo}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView >
            <View style={{
                right: 20,
                bottom: 20,
                flex: 1,
                position: 'absolute',
            }}>
                <TouchableOpacity style={{
                    backgroundColor: GlobalColors.accent,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 150,
                    height: 40,
                    borderRadius: 15,
                    borderColor: GlobalColors.whiteElement,
                    borderWidth: 1,
                    elevation: 4
                }}
                    onPress={() => props.navigation.navigate('NewContact')}
                >
                    <Text style={{
                        color: GlobalColors.textColor,
                        fontSize: 18,
                    }}>Agregar</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
export default Contacts;

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
    contactContainer: {
        backgroundColor: GlobalColors.whiteElement,
        marginVertical: 8,
        marginHorizontal: 20,
        elevation: 2,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20
    }
});