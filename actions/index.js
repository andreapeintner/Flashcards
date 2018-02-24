export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const QUIZ_DATE = 'UPDATE_DECK_DATE'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}
export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}
export function addCard (card, deck) {
    return {
        type: ADD_CARD,
        card,
        deck
    }
}

export function quizDate (deck, date) {
    return {
        type: QUIZ_DATE,
        deck,
        date
    }
}
