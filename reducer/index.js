import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
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
<<<<<<< HEAD
        case ADD_CARD:
            return {
                ...state,
                [action.deck.title]: {
                    ...state[action.deck.title],
                    cards: [
                        ...state[action.deck.title].cards,
                        { question: action.card.question, answer: action.card.answer }
                    ],
                    cardCount: state[action.deck.title].cardCount + 1
                }
=======
        // case ADD_CARD: {
        //     const { title, card } = action;
        //     return {
        //         ...state,
        //         [title]: {
        //         ...state[title],
        //         cards: [...state[title].cards, card],
        //         cardCount: state[title].cardCount + 1,
        //         },
        //     }
        case ADD_CARD :
            return {
                ...state,
                ...action.deck
>>>>>>> 8152f143face5e681ee82d7a00d3e022d0e59a26
            }
        // case ADD_CARD :
        //     const {title, card} = action
        //     return {
        //         ...state,
        //         [title]: {
        //             ...state[title],
        //             cards: [...state[title].cards, card],
        //             cardCount: state[title].cardCount + 1
        //         }
        //     }
        default :
            return state
    }
}

export default decks
