import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { gray, white, greenLight, greenBlue, yellowStrong, blue, greyLight } from '../utils/colors'
import { saveDeckTitle, getDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

function SubmitButton ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.iosSubmitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class DeckDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  _renderItem = ({ item, index }) => {
    return (
        <View style={styles.cardList}>
          <Text># {index + 1}</Text>
          <Text style={styles.type}>Question:</Text>
          <Text style={styles.text}>{item.question}</Text>
          <Text style={styles.type}>Answer:</Text>
          <Text style={styles.text}>{item.answer}</Text>
        </View>
      )
  }
  render() {
    const { navigation, deck, cards } = this.props
    const cardCount = deck.cards.length
    console.log(deck.cards, 'cards')
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.count}>
            {`cards: ${cardCount}`}
          </Text>
        </View>
        <View style={styles.add}>
          <TouchableOpacity style={styles.Btn}
            onPress={() => navigation.navigate('AddCard', { key: deck.title })}
          >
            <Text style={styles.BtnText}>Add Card</Text>
          </TouchableOpacity>
        {
          cardCount !== 0 &&
          <TouchableOpacity style={styles.Btn}
            onPress={() => {
              navigation.navigate('Quiz', { key: deck.title })
            }}
          >
            <Text style={styles.BtnText}>Start Quiz</Text>
          </TouchableOpacity>
        }
        </View>
        <FlatList
          data={Object.values(deck.cards)}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={item => item.question}
        />
      </View>
    )
  }
}

const styles=StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: greyLight
    },
    deck: {
      padding: 5,
      margin: 5,
      borderColor: white,
      borderRadius: 7,
      borderWidth: 1,
      backgroundColor: yellowStrong
    },
    icons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    },
    icon: {
      marginRight: 10
    },
    card: {
      margin: 20,
      borderColor: gray,
      backgroundColor: white
    },
    row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
    },
    title: {
      textAlign:'center',
      fontSize: 28,
      padding: 20,
      color: blue
    },
    count: {
      textAlign:'center',
      fontSize: 22,
      padding: 20,
      color: greenBlue
    },
    subtitle: {
      paddingTop: 40,
      paddingBottom: 20,
      fontSize: 18,
      textAlign: 'center'
    },
    add: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    Btn: {
      backgroundColor: greenLight,
      paddingTop: 10,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 5,
      borderRadius: 7,
      height: 50,
      margin: 10
    },
    BtnText: {
      color: blue,
      fontSize: 22,
      textAlign: 'center'
    },
    cardList: {
      padding: 20,
      margin: 20,
      backgroundColor: white,
      borderColor: gray,
    },
    type: {
      fontWeight: 'bold',
      fontSize: 20
    },
    text: {
      marginBottom: 10,
      fontSize: 18
    }
})


  const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.navigation.state.params
    return { deck: state[key] }

  }

  export default connect(mapStateToProps)(DeckDetail)
