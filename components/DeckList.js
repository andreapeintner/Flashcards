import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { getDeck } from '../utils/api'
import { receiveDecks } from '../actions'
import { getDecksInfo } from '../utils/helpers'
import { connect } from 'react-redux'


function DeckListItem({ deck, navigation }) {
    return (
      <View style={styles.Container}>
        <TouchableOpacity style={styles.deck}
          onPress={() => (
            navigation.navigate('DeckDetail', { title: deck.title }))}
        >
          <Text style={styles.listItemText}>{deck.title}</Text>
          <Text style={styles.listItemText}>{`${deck.cardCount} cards`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

class DeckList extends React.Component {

    componentDidMount() {
        console.log(this.state, 'state')
        getDeck().then(decks => (
            this.props.dispatch(receiveDecks(JSON.parse(decks)))));
    }



    render () {
        const { decks, navigation } = this.props
        console.log(decks, 'DECKSSSSS')
        return (
            <View style={styles.container}>
                <Text style={styles.title}>DeckList</Text>
                <FlatList
                data={decks}
                renderItem={({ item }) => (
                    <DeckListItem deck={item} navigation={navigation} />
                )}
            />
            </View>
        )
    }
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
    deck: {
        padding:20,
        margin: 10,
        borderColor: gray,
        borderRadius: 7,
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: white
    }
})

// const mapStateToProps = (state) => {
//     const decks = Object.keys(state.decks).map(id => state.decks[id]);
//     return { decks };
//   }
function mapStateToProps(decks) {
    console.log('mapstatetoprops', decks)
    return {
        decks: Object.values(decks)
    }
}

export default connect(mapStateToProps)(DeckList)
