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