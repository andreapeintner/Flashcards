import { AsyncStorage } from 'react-native'
import { getDecksInfo } from './helpers'

const STORAGE_DECKS_KEY = 'flashcards:decks'

export function saveDeckTitle(title) {
    console.log('saveDeckTitle', title)
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({ [title]: title, questions: [] })
    );
}

export function getDeck(id) {
    console.log('getDeck', id)
    return AsyncStorage.getItem(STORAGE_DECKS_KEY)
    .then(data => {JSON.parse(data)
        return data[id]
    })
    return undefined;
}

