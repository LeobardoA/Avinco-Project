import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeStackNavigator from './src/navigations/Navigator'
import { StatusBar } from 'react-native'
import { GlobalColors } from './src/theme/GlobalTheme'

export const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor={GlobalColors.primary} />
      <HomeStackNavigator />
    </NavigationContainer>
  )
}
export default App;