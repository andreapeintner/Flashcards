import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { white, orange, gray } from '../utils/colors'
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
            'Required data missing',
            'Please provide a deck title before submitting.',
            )
            return false
        }

        const newDeck = {
            [title]: {
                title: title,
                cards: [null],
                cardCount: 0
            },
        }

        createDeck(newDeck).then(this.props.addDeck(newDeck))

        // saveDeckTitle(title).then(() => {
        //     dispatch(addDeck(newDeck))
        //     console.log(newDeck, "DISPATCH")
        // })
        
        navigation.navigate('DeckList', {key: title})
        this.setState({ title: ' ' })
    }
    // clearQuery = () => {
    //     this.setState({ title: '' })
    // }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADD NEW DECK</Text>
                <Text style={styles.subtitle}>Enter a Title for your new Deck:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Title"
                    value={this.state.title}
                    onChangeText={this.handleTextChange}
                />
                <SubmitButton onPress={this.handleSubmit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: white
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
        marginTop: 40
    },
    subtitle: {
        paddingTop: 40,
        paddingBottom: 20,
        fontSize: 18
    },
    iosSubmitBtn: {
        backgroundColor: orange,
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
    input: {
        height: 40,
        borderColor: gray,
        borderRadius: 7,
        borderWidth: 1,
        paddingLeft: 20,
        marginBottom: 50,
        color: gray

    }
})

const mapStateToProps = state => {
    console.log(state, 'ADD DECK    ')
    return { decks: state }
}

export default connect(mapStateToProps, {addDeck})(AddDeck)