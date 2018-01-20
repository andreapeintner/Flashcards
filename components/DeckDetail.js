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

function DeckDetails(props) {
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
  
  
  const mapStateToProps = (state, ownProps) => {
    const deck = state.decks[ownProps.navigation.state.params.title];
    return { deck };
  };
  
  export default connect(mapStateToProps)(DeckDetails);