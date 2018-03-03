import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { white, greenLight, yellowStrong, blue } from '../utils/colors'
import { saveDeckTitle, createDeck } from '../utils/api'
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
                <Text style={styles.title}>ADD NEW DECK</Text>
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
        color: blue,
        fontWeight: 'bold'
    },
    iosSubmitBtn: {
        backgroundColor: greenLight,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    submitBtnText: {
        color: white,
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
        borderColor: white,
        borderRadius: 7,
        borderWidth: 1,
        backgroundColor: yellowStrong
    },
    input: {
        backgroundColor: white,
        height: 50,
        borderColor: blue,
        borderRadius: 7,
        borderWidth: 1,
        paddingLeft: 20,
        marginBottom: 50,
        color: blue

    }
})

const mapStateToProps = state => {
    return { decks: state }
}

export default connect(mapStateToProps, {addDeck})(AddDeck)
