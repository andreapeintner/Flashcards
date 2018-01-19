import { AsyncStorage } from 'react-native'
import { getDecksInfo } from './helpers'

const STORAGE_DECKS_KEY = 'flashcards:decks'

export function saveDeckTitle(title) {
    console.log('saveDeckTitle', title)
    return AsyncStorage.setItem(
        STORAGE_DECKS_KEY, JSON.stringify({ [title]: title })
    );
}

export function getDeck() {
    console.log('getDeck')
    return AsyncStorage.getItem(STORAGE_DECKS_KEY)
    .then(data => {
        console.log('results: ', data)
        if(!data) return {}
        return JSON.parse(data)
    }).catch(error => console.log(error))
    // return undefined;
}
