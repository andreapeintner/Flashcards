import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Constants from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducer'
import { yellowStrong } from './utils/colors'
import MainNavigator from './utils/navigation'
import { setLocalNotification } from './utils/helpers'


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} barStyle = "dark-content"/>
    </View>
  )
}

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={yellowStrong} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
})
