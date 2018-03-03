import { AsyncStorage } from 'react-native'
import { getDecksInfo } from './helpers'

const STORAGE_DECKS_KEY = 'flashcards:decks'

export function saveDeckTitle(title) {
    const deck = {
        key: title, cardCount: 0, cards: [],
    }
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({ [title]: deck })
    );
}

export const getDeck = () => {
    return AsyncStorage.getItem(STORAGE_DECKS_KEY).then(decks => JSON.parse(decks))
}

export const createDeck = deck =>
  AsyncStorage.mergeItem(STORAGE_DECKS_KEY, JSON.stringify(deck))


export const addCardToDeck = (card, deck) => {
    return AsyncStorage.mergeItem(
        STORAGE_DECKS_KEY, JSON.stringify({
            [deck.title]: {
                cards: [
                    ...deck.cards,
                    {
                        question: card.question,
                        answer: card.answer
                    }
                ]
            }
        })
    )
}

//for testing:
// export const resetDecks = () =>
//     AsyncStorage.setItem(STORAGE_DECKS_KEY, JSON.stringify(getDecksInfo))
