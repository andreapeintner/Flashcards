import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native'
import { white, greenBlue, yellowStrong, blue } from '../utils/colors'
import { getDeck, resetDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { getDecksInfo } from '../utils/helpers'
import { connect } from 'react-redux'


class DeckList extends React.Component {

    componentDidMount() {
        getDeck().then(decks => (
            this.props.receiveDecks(decks)
        ))
    }

    resetSubmit = () => {
        resetDecks();
        getDeck().then(decks => this.props.receiveDecks(decks));
    }
    _keyExtractor = (item, index) => item.id
    _renderItem = ({ item }) => {
        const cardCount = item.cards.length
        const { navigation } = this.props
        return (
            <View>
              <TouchableOpacity style={styles.deck}
                onPress={() => (
                  navigation.navigate('DeckDetail', { key: item.title }))}
              >
                <Text style={styles.listItemText}>{item.title}</Text>
                <Text style={styles.listItemCount}>{`(cards: ${cardCount})`}</Text>
              </TouchableOpacity>
            </View>
          )
    }
    render () {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.title}>DeckList</Text>
                <FlatList
                    data={Object.values(decks)}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.title}
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
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        backgroundColor: blue,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: white
    },
    listItemText: {
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: blue,
        fontWeight: 'bold'
    },
    listItemCount: {
        textAlign:'center',
        fontSize: 22,
        padding: 20,
        color: greenBlue
    },
    deck: {
        padding: 28,
        margin: 10,
        borderRadius: 7,
        backgroundColor: yellowStrong,
        shadowColor: blue,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 5,
    }
})


const mapStateToProps = state => {
    return {
        decks: state
    }
}

export default connect(mapStateToProps, {receiveDecks})(DeckList)
