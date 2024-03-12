import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
import { GlobalColors } from '../../theme/GlobalTheme'
import { LinearGradient } from 'expo-linear-gradient'
import { Picker } from '@react-native-picker/picker'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    elements: Array<string>;
}

export const ToolsChecker = ({ elements }: Props) => {

    const [checkboxStates, setCheckboxStates] = useState<boolean[]>(Array(elements.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
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
            }} >

                <View style={{
                    borderRadius: 15,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    elevation: 2
                }}>
                    <Picker mode='dropdown' style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        width: 320
                    }}>
                        <Picker.Item label={'Mantenimiento'} value={'Mantenimiento'} key={0} />
                        <Picker.Item label={'Mantenimiento'} value={'Mantenimiento1'} key={1} />
                        <Picker.Item label={'Mantenimiento'} value={'Mantenimiento2'} key={2} />
                        <Picker.Item label={'Mantenimiento'} value={'Mantenimiento3'} key={3} />
                    </Picker>
                </View>
            </LinearGradient>
            {/* CONTENT */}
            <ScrollView style={{
                flex: 1,
                marginTop: 35
            }}>
                {elements.map((element, index) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => handleCheckboxChange(index)} key={index}>
                        <Text>{element}</Text>
                        <FontAwesome name={checkboxStates[index] ? 'square-o' : 'check-square'} size={30} color={GlobalColors.primaryDarker} />
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
                    width: 200,
                    height: 50,
                    backgroundColor: GlobalColors.accent,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Revisar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn}>
                    <FontAwesome name='plus' size={35} color='#FFF' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn}>
                    <FontAwesome name='trash-o' size={35} color='#FFF' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn}>
                    <FontAwesome name='pencil-square-o' size={35} color='#FFF' />
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