import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getHTML, readFile, setHTML } from '../../components/DatabaseManager';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ListRenderItemInfo } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobalColors } from '../../theme/GlobalTheme';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Cliente from '../../components/Cliente';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Service from '../../components/Service';
import DeviceData from '../../components/DeviceData';

const screenWidth = Dimensions.get('window').width;

export const NewService = () => {
    const servicio = new Service();
    const [serviceData, setServiceData] = useState<DeviceData[]>([new DeviceData()]);
    const [alias, setAlias] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [correo, setCorreo] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Cliente>(clientes[0]);

    const printToFile = async () => {
        const html: any = await getHTML(servicio);
        // await Print.printAsync({ html });
        const { uri } = await Print.printToFileAsync({ html });
        const lastUri: any = await setHTML("prueba1.pdf", uri);
        const opcionesCompartir = { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Compartir Archivo' };
        await shareAsync(lastUri, opcionesCompartir);
    };
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
    useEffect(() => {
        setNombre(selectedClient ? selectedClient.nombre : 'Not set yet');
        setAlias(selectedClient ? selectedClient.alias : 'Not set yet');
        setCorreo(selectedClient ? selectedClient.correo : 'Not set yet');
        setDomicilio(selectedClient ? selectedClient.domicilio : 'Not set yet');
        setTelefono(selectedClient ? selectedClient.telefono : 'Not set yet');
    }, [selectedClient])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const renderItem = (item: ListRenderItemInfo<DeviceData>) => {
        const deviceTypeChange = (value: string, index: number) => {
            const updatedData = [...serviceData]; // Hacer una copia del estado
            updatedData[index].deviceType = value; // Actualizar el valor del dispositivo en el índice dado
            setServiceData(updatedData); // Actualizar el estado con los nuevos datos
        };
        const serviceTypeChange = (value: string, index: number) => {
            const updatedData = [...serviceData]; // Hacer una copia del estado
            updatedData[index].typeOfService = value; // Actualizar el valor del dispositivo en el índice dado
            setServiceData(updatedData); // Actualizar el estado con los nuevos datos
        };
        return item.item.isEmpty ? (
            <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Equipo {(item.index) + 1}:</Text>
                    <View style={styles.detailsContainer}>
                        <Text>Equipo Tipo:</Text>
                        <Picker
                            mode='dropdown'
                            style={{ fontWeight: "bold", fontSize: 10, flexGrow: 1 }}
                            selectedValue={item.item.deviceType}
                            onValueChange={(value) => deviceTypeChange(value, item.index)}
                        >
                            <Picker.Item key={1} label='Minisplit' value='Minisplit' />
                            <Picker.Item key={2} label='Dividido' value='Dividido' />
                            <Picker.Item key={3} label='Paquete' value='Paquete' />
                            <Picker.Item key={4} label='Chiller' value='Chiller' />
                            <Picker.Item key={5} label='Aire Lavado' value='Aire Lavado' />
                            <Picker.Item key={6} label='Otro tipo' value='Otro tipo' />
                        </Picker>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Capacidad:</Text>
                        <TextInput style={styles.textInput} placeholder='' onChangeText={(value) => { item.item.deviceCapacity = (value + 'T.R.') }} keyboardType='number-pad' />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Modelo:</Text>
                        <TextInput style={styles.textInputWithWrap} placeholder='' onChangeText={(value) => { item.item.deviceModel = value }} keyboardType='default' multiline />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Serie:</Text>
                        <TextInput style={styles.textInputWithWrap} placeholder='' onChangeText={(value) => { item.item.deviceSerial = value }} keyboardType='default' multiline />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Marca:</Text>
                        <TextInput style={styles.textInputWithWrap} placeholder='' onChangeText={(value) => { item.item.deviceBrand = value }} keyboardType='default' multiline />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Ubicacion:</Text>
                        <TextInput style={styles.textInputWithWrap} placeholder='' onChangeText={(value) => { item.item.deviceRoom = value }} keyboardType='default' multiline />
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Text>Tipo de Servicio:</Text>
                        <Picker
                            mode='dropdown'
                            style={{ width: 300, height: 50 }}
                            selectedValue={item.item.typeOfService}
                            onValueChange={(value) => serviceTypeChange(value, item.index)}
                        >
                            <Picker.Item key={1} label='Mantenimiento Preventivo' value='Mantenimiento Preventivo' />
                            <Picker.Item key={2} label='Revision' value='Revision' />
                            <Picker.Item key={3} label='Mantenimiento Correctivo' value='Mantenimiento Correctivo' />
                            <Picker.Item key={4} label='Instalacion' value='Instalacion' />
                        </Picker>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Text>Compresor:</Text>
                        <View style={styles.detailsContainer}>
                            <Text>Voltaje:</Text>
                            <TextInput style={styles.textInput} placeholder='' onChangeText={(value) => { item.item.compressorVoltage = value + 'V' }} keyboardType='number-pad' />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text>Amperaje:</Text>
                            <TextInput style={styles.textInput} placeholder='' onChangeText={(value) => { item.item.compressorAmp = value + ' Amp' }} keyboardType='number-pad' />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Text>Motor Condensador:</Text>
                        <View style={styles.detailsContainer}>
                            <Text>Voltaje:</Text>
                            <TextInput style={styles.textInput} placeholder='' onChangeText={(value) => { item.item.motorCVoltage = value + 'V' }} keyboardType='number-pad' />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text>Amperaje:</Text>
                            <TextInput style={styles.textInput} placeholder='' onChangeText={(value) => { item.item.motorCAmp = value + ' Amp' }} keyboardType='number-pad' />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Text>Motor Evaporador:</Text>
                        <View style={styles.detailsContainer}>
                            <Text>Voltaje:</Text>
                            <TextInput style={styles.textInput} placeholder='' onChangeText={(value) => { item.item.motorEVoltage = value + 'V' }} keyboardType='number-pad' />
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text>Amperaje:</Text>
                            <TextInput style={styles.textInput} placeholder='' onChangeText={(value) => { item.item.motorEAmp = value + ' Amp' }} keyboardType='number-pad' />
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Limpieza Serpertin Evap:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isSerpentinEv: !updatedServiceData[item.index].isSerpentinEv
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isSerpentinEv ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Limpieza Serpertin Cond:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isSerpentinCd: !updatedServiceData[item.index].isSerpentinCd
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isSerpentinCd ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Limpieza de Filtros:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isFilterCleaning: !updatedServiceData[item.index].isFilterCleaning
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isFilterCleaning ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Limpieza de Equipo</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isDeviceCleaning: !updatedServiceData[item.index].isDeviceCleaning
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isDeviceCleaning ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Limpieza de Tablero Electrico:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isElectricCircuit: !updatedServiceData[item.index].isElectricCircuit
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isElectricCircuit ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Revision de Terminales:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isTerminalsCheck: !updatedServiceData[item.index].isTerminalsCheck
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isTerminalsCheck ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Lubricacion:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isLubrication: !updatedServiceData[item.index].isLubrication
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isLubrication ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Presion Baja:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isLowPressure: !updatedServiceData[item.index].isLowPressure
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isLowPressure ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>Presion Alta:</Text>
                        <TouchableOpacity onPress={() => {
                            setServiceData(prevServiceData => {
                                const updatedServiceData = [...prevServiceData];
                                updatedServiceData[item.index] = {
                                    ...updatedServiceData[item.index],
                                    isHighPressure: !updatedServiceData[item.index].isHighPressure
                                };
                                return updatedServiceData;
                            });
                        }}>
                            <FontAwesome name={item.item.isHighPressure ? 'check-square-o' : 'square-o'} size={35} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 30 }}>
                        <Text>Notas:</Text>
                        <TextInput style={[styles.textInputWithWrap, { width: 300 }]} placeholder='' onChangeText={(value) => { item.item.notes = value }} keyboardType='default' multiline />
                    </View>
                </View>
            </View>
        ) : (
            <View style={styles.itemContainer}>
                <View style={styles.addContent}>
                    <TouchableOpacity onPress={() => {
                        item.item.isEmpty = true;
                        setServiceData([...serviceData, new DeviceData()]);
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <FontAwesome name='edit' size={45} color={GlobalColors.primaryDarker} />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: GlobalColors.primaryDarker }}>Agregar Equipo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
            <ScrollView style={styles.content}>
                {/* CLIENT DATA */}
                <View style={styles.clientData}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>Datos Cliente:</Text>
                    <Picker
                        mode='dropdown'
                        style={{ fontWeight: "bold", fontSize: 10, width: 320 }}
                        selectedValue={selectedClient}
                        onValueChange={(itemValue) => setSelectedClient(itemValue)}
                    >
                        {clientes.map((cliente, index) => (
                            <Picker.Item key={index} label={cliente.alias} value={cliente} />
                        ))}
                    </Picker>
                    {menuOpen && (
                        <View style={styles.clientDetails}>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsText}>Cliente:</Text>
                                <Text style={[styles.detailsText, styles.flexWrap]}>{nombre}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsText}>Domicilio:</Text>
                                <Text style={[styles.detailsText, styles.flexWrap]}>{domicilio}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsText}>Telefono:</Text>
                                <Text style={[styles.detailsText, styles.flexWrap]}>{telefono}</Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsText}>Correo:</Text>
                                <Text style={[styles.detailsText, styles.flexWrap]}>{correo}</Text>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={toggleMenu}>
                        <FontAwesome name={menuOpen ? 'caret-up' : 'caret-down'} size={25} color={'black'} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={serviceData}
                    contentContainerStyle={{ flexGrow: 1 }}
                    pagingEnabled
                    renderItem={(item) => renderItem(item)}
                />
                <TouchableOpacity onPress={() => {
                    servicio.clientName = nombre;
                    servicio.clientLocation = domicilio;
                    servicio.clientTel = telefono;
                    const date = new Date();
                    servicio.date_day = date.getDay();
                    servicio.date_month = date.getMonth();
                    servicio.date_year = date.getFullYear();
                    servicio.deviceData = serviceData;
                    printToFile();
                }}>
                    <View style={styles.exportButton}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Export</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView >
        </View >
    )
}
export default NewService;

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
    content: {
        marginTop: 35,
    },
    clientData: {
        backgroundColor: GlobalColors.whiteElement,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 20,
        elevation: 2,

    },
    itemContainer: {
        flex: 1,
        width: screenWidth,
    },
    itemContent: {
        backgroundColor: GlobalColors.whiteElement,
        flex: 1,
        borderRadius: 25,
        margin: 20,
        padding: 20,
        elevation: 2,
        alignItems: 'center'
    },
    addContent: {
        height: 300,
        flex: 1,
        backgroundColor: GlobalColors.whiteElement,
        elevation: 2,
        borderRadius: 25,
        margin: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300,
        marginVertical: 10,
        resizeMode: 'cover'
    },
    clientDetails: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    detailsText: {
        fontSize: 16,
    },
    flexWrap: {
        width: '60%'
    },
    exportButton: {
        width: '90%',
        backgroundColor: GlobalColors.accent,
        marginHorizontal: '5%',
        marginVertical: 10,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        minWidth: 125,
        backgroundColor: GlobalColors.whiteElement,
        borderRadius: 15,
        borderColor: '#999',
        borderWidth: 1,
        padding: 5,
        textAlign: 'center'
    },
    textInputWithWrap: {
        width: 200,
        backgroundColor: GlobalColors.whiteElement,
        borderRadius: 15,
        borderColor: '#999',
        borderWidth: 1,
        padding: 5,
        textAlign: 'center'
    }
});