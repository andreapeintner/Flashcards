import { AsyncStorage } from 'react-native'


const STORAGE_DECKS_KEY = 'flashcards:decks'

export function saveDeckTitle(key, title) {
    console.log('key and title', key, title);
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({ [key]: title, questions: [] })
    );
}

