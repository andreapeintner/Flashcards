import { AsyncStorage } from 'react-native'
import { getDecksInfo } from './helpers'

const STORAGE_DECKS_KEY = 'flashcards:decks'

export function saveDeckTitle(title) {
    console.log('ACTION_SaveTitle', title)
    // const deck = {
    //     key: title, title, cardCount: 0, cards: [],
    // }
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({ [title]: {title, title, cardCount: 0, cards: []} })
    );
}

export function getDeck() {
    console.log('Action getDeck')
    return AsyncStorage.getItem(STORAGE_DECKS_KEY)
    // .then(data => {
    //     console.log('results: ', data)
    //     if(!data) return {}
    //     return JSON.parse(data)
    // }).catch(error => console.log(error))
    // return undefined;
}

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
