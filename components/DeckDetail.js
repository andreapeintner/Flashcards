import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { white, orange, gray, lightPurp } from '../utils/colors'
import { saveDeckTitle, getDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'


function SubmitButton ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.iosSubmitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

function DeckDetail(props) {
    console.log(props, "DETAIL")
    const { navigation, deck, cardCount } = props;
    console.log(deck, '???')
    return (
      <View>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>
          {`${deck.cardCount} cards`}
        </Text>
        <TouchableOpacity style={styles.Btn}
          onPress={() => navigation.navigate('AddCard', { key: deck.title })}
        >
          <Text style={styles.BtnText}>Add Card</Text>
        </TouchableOpacity>
        {/* {
          cardCount === 0 && */}
            <TouchableOpacity style={styles.Btn}
              onPress={() => {
                // Reset notification since a quiz was started
                clearNotification().then(setNotification);
                navigation.navigate('StartQuiz', { key: deck.title });
              }}
            >
              <Text style={styles.BtnText}>Start Quiz</Text>
            </TouchableOpacity>
        {/* } */}
      </View>
    );
  }

const styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: orange
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
        
    },
    subtitle: {
        paddingTop: 40,
        paddingBottom: 20,
        fontSize: 18,
        textAlign: 'center'
    },
    Btn: {
        backgroundColor: lightPurp,
        padding: 5,
        borderRadius: 7,
        height: 45,
        margin: 50
    },
    BtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
})

// const mapStateToProps = (state, ownProps) => {
//     console.log(ownProps, '!!!!')
//     return { 
//         decktitle: ownProps.navigation.state.params.title,
//         cardCount: ownProps.navigation.state.params.cardCount
//     }
//   }

  const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.navigation.state.params
  
    return { deck: state[key] }
    console.log(deck, 'DECK!!!!')
  }
  
  export default connect(mapStateToProps)(DeckDetail)