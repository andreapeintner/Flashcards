import { AsyncStorage } from 'react-native'
import { getDecksInfo } from './helpers'

const STORAGE_DECKS_KEY = 'flashcards:decks'

export function saveDeckTitle(title) {
    console.log('ACTION_SaveTitle', title)
    const deck = {
        key: title, title, cardCount: 0, cards: [],
    }
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({ [title]: deck })
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
