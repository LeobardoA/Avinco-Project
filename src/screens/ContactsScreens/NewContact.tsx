import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobalColors } from '../../theme/GlobalTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { readFile, writeFile } from '../../components/DatabaseManager'
import Cliente from '../../components/Cliente'

export const NewContact = ({ navigation }: any) => {
    const [alias, setAlias] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [correo, setCorreo] = useState('');

    const guardarContacto = async () => {
        // Validar que ningún campo esté vacío
        if (!nombre || !telefono || !domicilio) {
            alert('Por favor, completa todos los campos');
            return;
        }

        let ccorreo
        if (correo) {
            // Validar el formato del correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                alert('El correo electrónico no tiene un formato válido');
                return;
            }
            else {
                ccorreo = correo;
            }
        } else {
            ccorreo = "Sin correo";
        }



        let telefonoFormateado
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(telefono)) {
            alert('El teléfono no tiene un formato válido.\nUn formato valido es un numero a 10 digitos.');
            return;
        }
        telefonoFormateado = telefono.replace(/(\d{2})(\d{4})(\d{2})/, '$1 $2 $3');

        let aalias
        if (!alias) {
            aalias = nombre;
        } else {
            aalias = alias;
        }

        let clientes: Cliente[] = await readFile("clientes.txt");

        if (!clientes) {
            clientes = []; // Inicializa como un array vacío si no hay datos
        }

        let cliente = new Cliente({ id: clientes.length, alias: aalias, correo: ccorreo, domicilio: domicilio, nombre: nombre, telefono: telefonoFormateado });

        console.log("Hola?");
        
        console.log(cliente);

        clientes.push(cliente);

        console.log(cliente);
        writeFile("clientes.txt", clientes);
        navigation.goBack();
    };
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
            }} />
            {/* CONTENT */}
            <ScrollView style={{
                flex: 1,
                marginTop: 35,
                paddingHorizontal: 15,
            }}>
                {/* TITULO */}
                <Text style={{ marginBottom: 10, fontSize: 16 }}>Datos De Cliente:</Text>
                {/* SEPARACION */}
                <View style={styles.infoContainer}>
                    <Text style={styles.titleText}>Nombre:</Text>
                    <TextInput style={styles.textInput} placeholder='Nombre' onChangeText={setNombre} />
                </View>
                {/* SEPARACION */}
                <View style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleText}>Alias:</Text>
                        <Text style={[styles.titleText, { color: '#999' }]}>(Opcional)</Text>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Alias' onChangeText={setAlias} />
                </View>
                {/* SEPARACION */}
                <View style={styles.infoContainer}>
                    <Text style={styles.titleText}>Telefono:</Text>
                    <TextInput style={styles.textInput} placeholder='Telefono' onChangeText={setTelefono} keyboardType='phone-pad' />
                </View>
                {/* SEPARACION */}
                <View style={styles.infoContainer}>
                    <Text style={styles.titleText}>Domicilio:</Text>
                    <TextInput style={styles.textInput} placeholder='Domicilio' onChangeText={setDomicilio} />
                </View>
                {/* SEPARACION */}
                <View style={styles.infoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleText}>Correo Electronico:</Text>
                        <Text style={[styles.titleText, { color: '#999' }]}>(Opcional)</Text>
                    </View>
                    <TextInput style={styles.textInput} placeholder='Correo' onChangeText={setCorreo} keyboardType='email-address' />
                </View>

            </ScrollView >
            <View style={{
                height: 60,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity style={{
                    width: 360,
                    height: 40,
                    backgroundColor: GlobalColors.accent,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    borderColor: GlobalColors.whiteElement,
                    borderWidth: 1,
                    elevation: 4,
                    flexDirection: 'row'
                }}
                    onPress={guardarContacto}
                >
                    <FontAwesome name='save' size={25} color={GlobalColors.textColor} />
                    <Text style={{
                        color: GlobalColors.textColor,
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
export default NewContact;

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
    textInput: {
        backgroundColor: GlobalColors.whiteElement,
        borderRadius: 15,
        borderColor: '#999',
        borderWidth: 1,
        padding: 5
    },
    titleText: {
        marginBottom: 10,
        paddingLeft: 5
    },
    infoContainer: {
        elevation: 2,
        marginVertical: 7,
        backgroundColor: GlobalColors.whiteElement,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 8,
    },
    btnSave: {
        position: 'absolute',
        backgroundColor: GlobalColors.accent,
        padding: 15,
        bottom: 0,
    }
});