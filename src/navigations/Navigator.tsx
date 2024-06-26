import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Contacts from '../screens/Contacts';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalColors } from '../theme/GlobalTheme';
import { ToolsChecker } from '../screens/ToolsScreens/ToolsChecker';
import NewContact from '../screens/ContactsScreens/NewContact';
import { DetailsContact } from '../screens/ContactsScreens/DetailsContact';
import { NewService } from '../screens/ServiceScreens/NewService';

const Tab = createBottomTabNavigator();

const ToolsCheckerScreen = () =>{
    return(
        <ToolsChecker/>
    )
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            backBehavior='initialRoute'
            initialRouteName='HomeScreen'
            detachInactiveScreens= {false}
            screenOptions={{
                headerShown: false, tabBarStyle: {
                    height: 60,
                    paddingVertical: 4,
                    backgroundColor: GlobalColors.whiteElement,
                    elevation: 5
                }
            }
            }>
            <Tab.Screen name="Contactos"
                component={Contacts}
                options={{
                    tabBarLabel: "Contactos", tabBarLabelStyle: { marginBottom: 5 }, tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' size={30} color={GlobalColors.primaryDarker} />
                    )
                }} />
            <Tab.Screen name="HomeScreen"
                component={Home}
                options={{
                    tabBarLabel: "Home", tabBarLabelStyle: { marginBottom: 5 }, tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='home' size={35} color={GlobalColors.primaryDarker} />
                    )
                }} />
        </Tab.Navigator>
    )
}

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={BottomTabNavigator} />
            <Stack.Screen name='Contacts' component={Contacts} />
            <Stack.Screen name='ToolsChecker' component={ToolsCheckerScreen} />
            <Stack.Screen name='NewContact' component={NewContact} />
            <Stack.Screen name='DetailsContact' component={DetailsContact} />
            <Stack.Screen name='NewService' component={NewService} />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator;