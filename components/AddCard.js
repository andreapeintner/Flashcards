import React from 'react'
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { blue, gray, white, greenLight, yellowLight } from '../utils/colors'
import { addCardToDeck, getDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard, receiveDecks } from '../actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function SubmitButton ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.submitBtn}>
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
                <View>
                    <Text style={styles.title}>New Card</Text>
                    <View style={styles.cardContainer}>
                        <Text style={styles.subtitle}>Enter a question:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Question"
                            onChangeText={this.changeQuestion}
                        />
                        <Text style={styles.subtitle}>Enter the answer:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Answer"
                            onChangeText={this.changeAnswer}
                        />
                    </View>
                    <SubmitButton onPress={this.handleSubmit} />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    title: {
        backgroundColor: yellowLight,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: blue
    },
    cardContainer: {
        padding: 30,
        borderColor: gray,
        borderWidth: 1,
        margin: 20,
        shadowColor: blue,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 5,
    },
    subtitle: {
        fontSize: 18
    },
    submitBtn: {
        backgroundColor: greenLight,
        padding: 10,
        marginTop: 20,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        shadowColor: gray,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 1,
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
    input: {
        height: 50,
        fontSize: 20,
        borderColor: gray,
        borderRadius: 7,
        borderWidth: 1,
        paddingLeft: 20,
        marginBottom: 20,
        marginTop: 10,
        color: gray,
        shadowColor: gray,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 2,
    }
})
const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.navigation.state.params
    return { deck: state[key] }
}


export default connect(mapStateToProps, {addCard})(AddCard)
