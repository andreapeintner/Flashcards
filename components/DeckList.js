import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, Button } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { getDeck } from '../utils/api'
import { receiveDecks } from '../actions'
import { getDecksInfo } from '../utils/helpers'
import { connect } from 'react-redux'


// function DeckListItem({ item, navigation }) {
//     return (
//       <View style={styles.Container}>
//         <TouchableOpacity style={styles.deck}
//           onPress={() => (
//             navigation.navigate('DeckDetail', { key: item.title }))}
//         >
//           <Text style={styles.listItemText}>{item.title}</Text>
//           <Text style={styles.listItemText}>{`${item.cardCount} cards`}</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }

class DeckList extends React.Component {
    
    componentDidMount() {
        getDeck().then(decks => (
            this.props.receiveDecks(decks)))
    }
    
    renderItem = ({ item }) => {
        const { navigation } = this.props
        return (
            <View style={styles.Container}>
              <TouchableOpacity style={styles.deck}
                onPress={() => (
                  navigation.navigate('DeckDetail', { key: item.title }))}
              >
                <Text style={styles.listItemText}>{item.title}</Text>
                <Text style={styles.listItemText}>{`${item.cardCount} cards`}</Text>
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


// function mapStateToProps(decks) {
//     console.log('mapstatetoprops', decks, state)
//     return {
//         decks: Object.values(decks)
//     }
// }

const mapStateToProps = state => {
    console.log(state, 'STATE LIST')
    return { decks: state }
    console.log(decks, 'STATE2')
}

export default connect(mapStateToProps, {receiveDecks})(DeckList)
