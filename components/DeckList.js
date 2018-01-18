import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { getDeck } from '../utils/api'
import { getDecksInfo } from '../utils/helpers'

export default class DeckList extends React.Component {
    state = {
        decks:[{
            title:'',
            questions:[]
        }],
    }

    
    render () {
        const { decks } = this.state
        console.log(this.state.decks)
        return (
            <View style={styles.container}>
                <Text>DeckList</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    
})
