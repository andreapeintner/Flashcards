import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { white, orange, gray } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'


function SubmitButton ({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}
            style={styles.iosSubmitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

export default class AddDeck extends React.Component {

    state = {
        decktitle: ''
    }
    handleChange = (e) => {
        this.setState((state) => ({ decktitle: e}))
    }
    submit = () => {
        this.state.decktitle === '' 
        ? Alert.alert('Alert:', 'Please enter a title for your deck', [
                {text: 'Ok', onPress: () => { return false }}
            ],
            { cancelable: true }
        )
        : saveDeckTitle(this.state.decktitle)
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ADD NEW DECK</Text>
                <Text style={styles.subtitle}>Enter a Title for your new Deck:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Title" 
                    onChangeText={(decktitle) => this.setState({decktitle})}
                />
                <SubmitButton onPress={this.submit}/>
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
