import React, { useState } from 'react'
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GlobalColors } from '../theme/GlobalTheme';

export const History = () => {

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
                marginTop: 35
            }}>
            </ScrollView >

        </View >
    )
}
export default History;

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
});