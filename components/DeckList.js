import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, Button } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { getDeck, resetDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { getDecksInfo } from '../utils/helpers'
import { connect } from 'react-redux'



class DeckList extends React.Component {
    
    componentDidMount() {
        getDeck().then(decks => (
            this.props.receiveDecks(decks)))
    }

    resetSubmit = () => {
        resetDecks();
        getDeck().then(decks => this.props.receiveDecks(decks));
    }

    renderItem = ({ item }) => {
        // console.log(item.cards.length, "cards -length")
        //const cardCount = item.cards.length
        const { navigation } = this.props
        return (
            <View style={styles.Container}>
              <TouchableOpacity style={styles.deck}
                onPress={() => (
                  navigation.navigate('DeckDetail', { key: item.title }))}
              >
                <Text style={styles.listItemText}>{item.title}</Text>
                {/* <Text style={styles.listItemText}>{`${cardCount} cards`}</Text> */}
              </TouchableOpacity>
            </View>
          )
    }
    render () {
        const { decks, navigation } = this.props
        console.log(decks, 'DECKSSSSS')
        return (
            <View style={styles.container}>
                <Text style={styles.title}>DeckList</Text>
                <FlatList
                    data={Object.values(decks)}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                    ListFooterComponent={this.renderFooter}
                />
                <Button title="Reset Sample Data" onPress={() => this.resetSubmit()} />
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
        backgroundColor: white
    }
})


const mapStateToProps = state => {
    return { 
        decks: state 
    }
}

export default connect(mapStateToProps, {receiveDecks})(DeckList)
