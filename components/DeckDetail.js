import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
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
    const { navigation } = props;
    const { title, cardCount } = props.deck || {};
  
    return (
      <View>
        <Text >{title}</Text>
        <Text>
          {`${cardCount} cards`}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewCard', { title })}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        {
          cardCount !== 0 &&
            <TouchableOpacity
              onPress={() => {
                // Reset notification since a quiz was started
                clearNotification().then(setNotification);
                navigation.navigate('Quiz', { title });
              }}
            >
              <Text>Start Quiz</Text>
            </TouchableOpacity>
        }
      </View>
    );
  }
//   const mapStateToProps = (state) => {
//     const decks = Object.keys(state.decks).map(id => state.decks[id]);
//     return { decks };
//   };
  
//   function mapStateToProps(decks, ownProps) {
//     return {
//         decks: Object.values(decks.params.title)
//     }
// }

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps, state ,'!!!!')
    return { 
        deck: ownProps.navigation.state.params.title
    }
  }


  
  export default connect(mapStateToProps)(DeckDetail);