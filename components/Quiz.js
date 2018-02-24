import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import { gray, white, pink, greenStrong, orange, greenLight, greenBlue, yellowLight, yellowStrong, red, blue, greyLight } from '../utils/colors'
import { connect } from 'react-redux'
import { Ionicons, FontAwesomem, Entypo } from '@expo/vector-icons'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import { dateQuizTaken } from '../utils/api'
import { quizDone } from '../actions'

class Quiz extends React.Component {
    state = {
        actualCard: 0,
        cardsNumber: this.props.deck.cards.length,
        rightAnswer: 0,
        showAnswer: false,
        quizDone: false
    }
    resetQuiz = () => {
        this.setState({
          actualCard: 0,
          cardsNumber: this.props.deck.cards.length,
          rightAnswer: 0,
          showAnswer: false,
          quizDone: false
        })
    }
    turnCard = () => {
        this.setState(state => ({ showAnswer: !state.showAnswer }))
    }
    isFinalQuestion = () =>
        this.state.actualCard === this.state.cardsNumber - 1

    completeQuiz = () => {
        const { deck } = this.props
        const quizDate = Date.now()
    
        //dateQuizTaken(quizDate).then(this.props.quizDone(deck, quizDate))

        clearLocalNotification().then(setLocalNotification())
    }
    answerCorrect = () => {
        this.isFinalQuestion()
          ? this.setState(
              state => ({
                rightAnswer: state.rightAnswer + 1,
                quizDone: true
              }),
              () => this.completeQuiz()
            )
          : this.setState(state => ({
              actualCard: state.actualCard + 1,
              rightAnswer: state.rightAnswer + 1,
              showAnswer: false
        }))
    }
    answerIncorrect = () => {
        this.isFinalQuestion()
          ? this.setState(
              state => ({
                quizDone: true
              }),
              () => this.completeQuiz()
            )
          : this.setState(state => ({
              actualCard: state.actualCard + 1,
              showAnswer: false
        }))
    }
    render() {
        const {
            actualCard,
            cardsNumber,
            rightAnswer,
            showAnswer,
            quizDone
          } = this.state
          const { deck } = this.props
      
          const cardsRemaining = cardsNumber - (actualCard + 1)
          const score = rightAnswer / cardsNumber * 100
      
        return !quizDone ? (
            <View>
                <Text style={styles.title}>{deck.title} - Quiz</Text>
                <Text style={styles.questionNr}>
                    {cardsRemaining === 0
                        ? 'Last Question'
                        : `${actualCard + 1} / ${cardsNumber}`
                    }
                </Text>
                <Text style={styles.questAnsw}>
                    { showAnswer ? deck.cards[actualCard].answer : deck.cards[actualCard].question }
                </Text>
                <TouchableOpacity style={styles.turnCard} onPress={() => this.turnCard()}>
                    <Text style={styles.turnCardText}>{showAnswer ? 'Show Question' : 'Show Answer'}</Text>
                </TouchableOpacity>
                <View style={styles.add}>
                    <TouchableOpacity style={styles.btn} onPress={() => this.answerCorrect()}>
                        <Text style={styles.btnText}>Right</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnWrong} onPress={() => this.answerIncorrect()}>
                        <Text style={styles.btnText}>Wrong</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : score == 100 ? (
            <View title={`${deck.title} Quiz - Your Score`}>
                <Text style={styles.didIt}>
                    You did it! You answerd every question correctly.
                </Text>
                <View style={styles.add}>
                    <TouchableOpacity style={styles.DoneBtn} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.DoneBtnText}> Back to Deck </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DoneBtn} onPress={() => this.resetQuiz()}>
                        <Text style={styles.DoneBtnText}> Restart Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View title={`${deck.title} Quiz - Your Score`}>
                <Text style={styles.nearlyDidIt}>
                    Well done! Your score is ({score.toFixed(0)}%). 
                    {"\n"}
                    You answered {rightAnswer} out of {cardsNumber} correctly.
                    {"\n"}{"\n"}
                    Give it another shot
                </Text>
                <View style={styles.add}>
                    <TouchableOpacity style={styles.DoneBtn} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.DoneBtnText}> Back to Deck </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DoneBtn} onPress={() => this.resetQuiz()}>
                        <Text style={styles.DoneBtnText}> Restart Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    title: {
        backgroundColor: yellowStrong,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: blue
    },
    questionNr: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: greenBlue,
    },
    questAnsw: {
        borderWidth: 1,
        borderColor: blue,
        padding: 40,
        textAlign: 'center',
        fontSize: 18,
        margin: 20,
        fontStyle: 'italic'
    },
    turnCard: {
        marginBottom: 50,
        marginTop: 20,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: yellowLight,
        height: 40,
        padding: 10,
        borderRadius: 7,
    },
    turnCardText: {
        color: blue,
        fontSize: 18,
        textAlign: 'center'
    },
    add: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: greenStrong,
        paddingTop: 10,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        height: 50,
        margin: 20
    },
    btnWrong: {
        backgroundColor: red,
        paddingTop: 10,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        height: 50,
        margin: 20
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    didIt: {
        backgroundColor: greenStrong,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: white
    },
    nearlyDidIt: {
        backgroundColor: orange,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: white
    },
    DoneBtn: {
        backgroundColor: yellowLight,
        paddingTop: 10,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        height: 50,
        margin: 10
    },
    DoneBtnText: {
        color: blue,
        fontSize: 22,
        textAlign: 'center'
    },
})

const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.navigation.state.params
    console.log(state[key], 'Quiz')
    return { deck: state[key] }

  }

export default connect(mapStateToProps)(Quiz)