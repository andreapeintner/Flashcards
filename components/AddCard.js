import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { addCardToDeck, getDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard, receiveDecks } from '../actions'

function SubmitButton ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.iosSubmitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddCard extends React.Component {

    state = {
        // title: this.props.navigation.state.params.decktitle,
        question: '',
        answer: ''
    }

<<<<<<< HEAD
    changeQuestion = (text) => {
         this.setState({ question: text })
=======
    changeQuestion = (question) => {
        this.setState({ question })
>>>>>>> 8152f143face5e681ee82d7a00d3e022d0e59a26
    }

    changeAnswer = (answer) => {
        this.setState({ answer })
    }

    handleSubmit = () => {
        const { question, answer } = this.state
        const { deck, navigation } = this.props

        const card = { question: question, answer: answer }


        // console.log('handlesubmmitcard')

        // console.log(this.props, 'PROPS')
        // console.log(this.state, "STATE")

        //console.log(this.props.navigation.state.params.decktitle, "title dude") // key of deck
        
        // const { dispatch, navigation } = this.props
        // const { question, answer } = this.state
        // const { title } = navigation.state.params
        // const { decktitle } = this.props.navigation.state.params.decktitle
        //const { deck } = mapStateToProps(this.props.navigation.state.params.decktitle)
    
        // console.log(deck, "the deck k/v in handlesubmit")
        // console.log(Object.values(deck)[0], "the deck v in handlesubmit")

        if(!question) {
            Alert.alert(
                "You didn't enter a question",
                "Please fill in your question"
            )
        } else if (!answer) {
            Alert.alert(
                "You didn't enter the answer",
                "Please fill in the answer"
            )
        } else {
            addCardToDeck(deck, card).then(this.props.addCard(deck, card));

            console.log(this.state, 'STTAE add card')
            console.log(this.props, 'PROPS add card')

            // const newCard = { question, answer }
            
            // Object.values(deck)[0].cards.push(newCard)
            // console.log(Object.values(deck)[0], "ss")

            // const mydeck = Object.values(deck)[0]
            
            // const STORAGE_DECKS_KEY = 'flashcards:decks'
            // AsyncStorage.mergeItem(
            //     STORAGE_DECKS_KEY, JSON.stringify({ [title]: { mydeck } })
            // )
            // navigation.goBack()
        }
    }

    render () {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADD NEW CARD</Text>
                <Text style={styles.subtitle}>Enter a question</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Question"
                    onChangeText={this.changeQuestion}
                />
                <Text style={styles.subtitle}>Enter the answer</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Answer"
                    onChangeText={this.changeAnswer}
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

function mapStateToProps(state, ownProps) {
    // console.log(ownProps.navigation.state.params, 'ownstate')
    // console.log(state, 'state in AddCard#mapStateToProps')
    // console.log(ownProps, "ownProps in AddCard#mapStateToProps")
    // deck = state
    const { deck } = ownProps.navigation.state.params

    return { deck: state[deck] }
    
}


<<<<<<< HEAD
export default connect(mapStateToProps, {addCard})(AddCard)
=======
export default connect()(AddCard)
>>>>>>> 8152f143face5e681ee82d7a00d3e022d0e59a26
