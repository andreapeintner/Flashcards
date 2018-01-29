import { AsyncStorage } from 'react-native'
import { getDecksInfo } from './helpers'

const STORAGE_DECKS_KEY = 'flashcards:decks'

export function saveDeckTitle(title) {
    console.log('ACTION_SaveTitle', title)
    const deck = {
        key: title, cardCount: 0, cards: [],
    }
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({ [title]: deck })
    );
}

export const getDeck = () => {
    console.log('Action getDeck')
    return AsyncStorage.getItem(STORAGE_DECKS_KEY).then(decks => JSON.parse(decks))
}

<<<<<<< HEAD
export const createDeck = deck =>
  AsyncStorage.mergeItem(STORAGE_DECKS_KEY, JSON.stringify(deck))
// export function getDeckForTitle( title ) {
//     console.log(title, "Api/getDeckForTitle")
//     return AsyncStorage.getItem(STORAGE_DECKS_KEY).then(d => )
//     //then(deck => JSON.parse(deck))
// }

// export function addCardToDeck(deck_title, card) {
//     console.log(deck_title, 'DECKTITLE')
//     console.log(card, 'CARD')
//     return AsyncStorage.getItem(deck_title)
//     .then(item => {
//         let newCard = JSON.parse(card)
//         //newCard[title].questions.push(card)
//         return newCard
//     })
//     .then(newCard => 
//         AsyncStorage.mergeItem(
//             STORAGE_DECKS_KEY, JSON.stringify(newCard)
//         )
//     )
// }

export const addCardToDeck = (deck, card) => {
    const updCards = [
            ...deck.cards,
        {
            question: card.question,
            answer: card.answer
        }
    ]
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({[deck.title]: { cards: updCards }})
      )
}
=======
export function addCardToDeck(deck) {
    return AsyncStorage.mergeItem(STORAGE_DECKS_KEY)
}

// export function addCardToDeck(title, card) {
//     console.log('addCardToDeck', title, card)
//     return AsyncStorage.getItem(STORAGE_DECKS_KEY => {
//         const { cardCount, cards } = JSON.parse(decks)[title]

//         cards.push(card)
//         console.log(state, "XXXXX")
//         return AsyncStorage.mergeItem(
//             STORAGE_DECKS_KEY, JSON.stringify({ [title]: {card, cardCount: cardCount + 1} })
//         )
//     })
// }
>>>>>>> 8152f143face5e681ee82d7a00d3e022d0e59a26
