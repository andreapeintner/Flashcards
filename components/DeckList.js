import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { getDeck } from '../utils/api'
import { receiveEntries } from '../actions'
import { getDecksInfo } from '../utils/helpers'
import { connect } from 'react-redux'

class DeckList extends React.Component {





    async componentDidMount() {
        console.log('Decklist')
        try {
            const entries = await getDeck();
            this.props.dispatch(receiveEntries(entries))
        }
        catch(error) {
            console.log(error, 'ERROR')
        }
    }
    _renderItem = (item) => {
        console.log('DeckList _renderItem item: ', item.item, index)
        const entry = item.item
        const { index } = item
        return (
            <View>
                {}
                <Text style={styles.deckHeader} key={index}>{entry}</Text>
                {/* <Text style={styles.deckSubHeader}>{entry.length}</Text> */}
            </View>
        );
    }
    _keyExtractor = (item, index) => index;


    render () {
        const { entries } = this.props
        console.log(entries)
        return (
            <View style={styles.container}>
                <Text>DeckList</Text>
                <FlatList
                data={entries}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
            </View>
        )
    }
}

const styles=StyleSheet.create({

})
function mapStateToProps(entries) {
    console.log('mapstatetoprops', entries)
    return {
        entries: Object.values(entries)
    }
}

export default connect(mapStateToProps)(DeckList)
