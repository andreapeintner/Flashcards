import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, QUIZ_DATE } from '../actions'

function decks(state = {}, action) {
    console.log(state, 'state reducer')
    console.log(action, 'action reducer')
    switch (action.type) {
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD:
            return {
                ...state,
                [action.deck.title]: {
                    ...state[action.deck.title],
                    cards: [...state[action.deck.title].cards, action.card]
                }
            }
        case QUIZ_DATE:
            return {
              ...state,
                [action.deck.title]: {
                    ...state[action.deck.title],
                    QuizDone: action.date
                }
            };
        default :
            return state
    }
}

export default decks
