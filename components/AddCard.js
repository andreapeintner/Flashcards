import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'

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
        question: '',
        answer: ''
    }

    changeQuestion = (question) => {
        this.setState({ question })
    }

    changeAnswer = (answer) => {
        this.setState({ answer })
    }


    handleSubmit = () => {
        console.log(this.state, this.props, "Q+A")
        const { dispatch, navigation } = this.props
        const { question, answer } = this.state
        const { deck } = navigation.state.params

        if (!question) {
            Alert.alert(
                'Required data missing',
                'Please provide a question before submitting.',
            )
        } else if (!answer) {
            Alert.alert(
                'Required data missing',
                'Please provide an answer before submitting.',
            )
        } else {
            console.log('next')
            // const newCard = { question, answer }

            // addCardToDeck(title, card).then(() => {
            //     dispatch(addCardToDeck(title, newCard))
            //     console.log(newCard, "DISPATCH")
            // })
            const newCard = {
                [deck.title]: {
                  title: deck.title,
                  questions: [...deck.questions, { question, answer }]
                }
              };
            dispatch(addCardToDeck(newCard))
            // const newCard = { question, answer };
            // addCardToDeck(title, newCard).then(() => {
            //     return dispatch(addCard(title, card))
            // });

            navigation.goBack();
    }
        }
    // clearQuery = () => {
    //     this.setState({ title: '' })
    // }

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


export default connect()(AddCard)
