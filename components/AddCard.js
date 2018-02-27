import React from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { gray, white, greenLight } from '../utils/colors'
import { addCardToDeck, getDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard, receiveDecks } from '../actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
        const { question, answer } = this.state
        const { deck, navigation } = this.props
        const card = { question: question, answer: answer }

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
            addCardToDeck(card, deck).then(this.props.addCard(card, deck))
            navigation.goBack()
        }
    }

    render () {

        return (
            <KeyboardAwareScrollView
                style={{ backgroundColor: white }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
            >
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
            </KeyboardAwareScrollView>
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
    },
    subtitle: {
        paddingTop: 40,
        paddingBottom: 20,
        fontSize: 18
    },
    iosSubmitBtn: {
        backgroundColor: greenLight,
        padding: 10,
        marginTop: 20,
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
        marginBottom: 10,
        color: gray

    }
})
const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.navigation.state.params
    return { deck: state[key] }

  }


export default connect(mapStateToProps, {addCard})(AddCard)
