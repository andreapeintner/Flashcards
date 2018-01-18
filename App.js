import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { white, orange, gray, purple } from './utils/colors'
import Constants from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
// import actions from './actions'

import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='home' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: gray,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={gray} barStyle='light-content' />
          <MainNavigator />
          {/* <AddDeck /> */}
        </View>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: white
  },
  row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
  },
  title: {
      textAlign:'center',
      fontSize: 22,
      padding: 20,
      marginTop: 40
  },
  subtitle: {
      paddingTop: 40,
      paddingBottom: 20,
      fontSize: 18
  },
  iosSubmitBtn: {
      backgroundColor: orange,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
  },
  submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center'
  },
  center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30
  },
  input: {
      height: 40,
      borderColor: gray,
      borderRadius: 7,
      borderWidth: 1,
      paddingLeft: 20,
      marginBottom: 50,
      color: gray

  }
})