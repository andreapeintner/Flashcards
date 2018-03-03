import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, greenStrong, orange, greenLight, greenBlue, yellowLight, red, blue, yellowStrong, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { Ionicons, FontAwesomem, Entypo } from '@expo/vector-icons'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import FlipCard from 'react-native-flip-card'

class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            actualCard: 0,
            cardsNumber: this.props.deck.cards.length,
            rightAnswer: 0,
            showAnswer: false,
            finishedQuiz: false,
            flip: false
        }
    }
    resetQuiz = () => {
        this.setState({
            actualCard: 0,
            cardsNumber: this.props.deck.cards.length,
            rightAnswer: 0,
            finishedQuiz: false
        })
    }
    isFinalQuestion = () =>
        this.state.actualCard === this.state.cardsNumber - 1

    answerCorrect = () => {
        this.isFinalQuestion()
          ? this.setState(
                state => ({
                    rightAnswer: state.rightAnswer + 1,
                    finishedQuiz: true
                }),
                () => this.completeQuiz()
            )
          : this.setState(state => ({
                actualCard: state.actualCard + 1,
                rightAnswer: state.rightAnswer + 1,
                flip: false
        }))
    }
    answerIncorrect = () => {
        this.isFinalQuestion()
        ? this.setState (
            state => ({
                finishedQuiz: true
            }),
            () => this.completeQuiz()
        )
        : this.setState(state => ({
            actualCard: state.actualCard + 1,
            flip: false
        }))
    }
    completeQuiz = () => {
        clearLocalNotification()
            .then(setLocalNotification)
    }
    render() {
        const {
            actualCard,
            cardsNumber,
            rightAnswer,
            showAnswer,
            finishedQuiz
        } = this.state
        const { deck } = this.props

        const cardsRemaining = cardsNumber - (actualCard + 1)
        const score = rightAnswer / cardsNumber * 100

        return !finishedQuiz ? (
            <View style={{flex: 1}}>
                <ScrollView>
                    <Text style={styles.title}>{deck.title} - Quiz</Text>
                    <Text style={styles.questionNr}>
                        {cardsRemaining === 0
                            ? 'Last Question'
                            : `${actualCard + 1} / ${cardsNumber}`
                        }
                    </Text>
                    <FlipCard
                        style={styles.flipCard}
                        friction={5}
                        perspective={1000}
                        flipHorizontal={true}
                        flipVertical={false}
                        flip={this.state.flip}
                        clickable={true}
                    >
                        <View>
                            <Text style={styles.questAnsw}>
                                {deck.cards[actualCard].question}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.questAnsw}>
                                {deck.cards[actualCard].answer}
                            </Text>
                        </View>
                    </FlipCard>
                    <TouchableOpacity style={styles.turnCard} onPress={()=>{this.setState({flip: !this.state.flip})}}>
                        <Text style={styles.turnCardText}>{this.state.flip ? 'Show Question' : 'Show Answer'}</Text>
                    </TouchableOpacity>
                    <View style={styles.add}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.answerCorrect()}>
                            <Text style={styles.btnText}>Right</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnWrong} onPress={() => this.answerIncorrect()}>
                            <Text style={styles.btnText}>Wrong</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        ) : score == 100 ? (
            <View title={`${deck.title} Quiz - Your Score`}>
                <Text style={styles.fullScore}>
                    😎
                    {"\n"}
                    You did it!
                    {"\n"}
                    You answerd every question correctly!
                    {"\n"}
                    Well Done and keep learning!
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
        ) : score < 25 ? (
            <View title={`${deck.title} Quiz - Your Score`}>
                <Text style={styles.littleScore}>
                    🙁 Your score is ({score.toFixed(0)}%).
                    {"\n"}
                    You'll do better next time!
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
                <Text style={styles.inbetweenScore}>
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
        backgroundColor: orange,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: white
    },
    questionNr: {
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
        color: greenBlue,
    },
    questAnsw: {
        padding: 40,
        textAlign: 'center',
        fontSize: 24,
        margin: 20,
        fontStyle: 'italic'
    },
    flipCard: {
        backgroundColor: yellowStrong,
        shadowColor: gray,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 5,
        borderColor: yellowStrong
    },
    turnCard: {
        marginBottom: 50,
        marginTop: 30,
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: greenLight,
        height: 50,
        padding: 10,
        borderRadius: 7,
        shadowColor: gray,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 2,
    },
    turnCardText: {
        color: blue,
        fontSize: 20,
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
        margin: 20,
        width: 100,
        shadowColor: gray,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 2,
    },
    btnWrong: {
        backgroundColor: red,
        paddingTop: 10,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        height: 50,
        margin: 20,
        width: 100,
        shadowColor: gray,
        shadowOffset: {width:1, height:1},
        shadowOpacity: 2,
        shadowRadius: 2,
    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    fullScore: {
        backgroundColor: greenStrong,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: white
    },
    inbetweenScore: {
        backgroundColor: orange,
        borderRadius: 5,
        textAlign:'center',
        fontSize: 28,
        padding: 20,
        color: white
    },
    littleScore: {
        backgroundColor: red,
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
    return { deck: state[key] }

  }

export default connect(mapStateToProps)(Quiz)
