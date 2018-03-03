import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { gray, white, greenLight, yellowStrong, blue } from '../utils/colors'
import { saveDeckTitle, createDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

function SubmitButton ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends React.Component {

    state = {
        title: ''
    }

    handleTextChange = (text) => {
        this.setState({ title: text })
    }

    handleSubmit = () => {
        const { dispatch, navigation, decks } = this.props
        const { title } = this.state

        if (!title) {
            Alert.alert(
                'Error',
                'Please insert a deck title before you submit.',
            )
            return false
        }

        const newDeck = {
            [title]: {
                title: title,
                cards: []
            }
        }

        createDeck(newDeck).then(this.props.addDeck(newDeck))

        navigation.navigate('DeckDetail', { key: title })
        this.setState({ title: ' ' })
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>New Deck</Text>
                <View style={styles.deck}>
                    <Text style={styles.subtitle}>Decktitle:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={this.state.title}
                        onChangeText={this.handleTextChange}
                    />
                </View>
                <SubmitButton onPress={this.handleSubmit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    subtitle: {
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: blue
    },
    submitBtn: {
        backgroundColor: greenLight,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 20,
        shadowColor: gray,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 2,
    },
    submitBtnText: {
        color: blue,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    deck: {
        padding: 45,
        margin: 10,
        borderRadius: 7,
        backgroundColor: yellowStrong,
        shadowColor: blue,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 5,
    },
    input: {
        backgroundColor: white,
        height: 60,
        fontSize: 20,
        borderRadius: 7,
        paddingLeft: 20,
        marginBottom: 50,
        color: blue,
        shadowColor: blue,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 2,
    }
})

const mapStateToProps = decks => ({ decks })

export default connect(mapStateToProps, {addDeck})(AddDeck)
