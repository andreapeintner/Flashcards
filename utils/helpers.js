import React from 'react'
import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const DAILY_REMINDER = 'flashcards:notification'
const NOTIFY_CUSTOM_KEY = 'udaci:notifications_custom';

export const getDecksInfo = {
    React: {
        title: 'React',
        lastDateQuizTaken: 1512530132676,
        cards: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        lastDateQuizTaken: 1512530132676,
        cards: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

// export function getDailyReminderValue () {
//     return {
//       today: "👋 Don't forget to check your knowledge today"
//     }
//   }

export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(DAILY_REMINDER).then(
        Notifications.cancelAllScheduledNotificationsAsync
    )
}
  
function createNotification() {
    return {
        title: "👋 Don't forget to Quiz yourself today!",
        body: 'Everyday practice will help you remeber your flashcards in notime',
        ios: {
            sound: true
        },
    }
}
  
export function setLocalNotification() {
    AsyncStorage.getItem(DAILY_REMINDER)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()
    
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)
        
                    Notifications.scheduleLocalNotificationAsync(createNotification(), {
                        time: tomorrow,
                        repeat: 'day'
                    })
                    AsyncStorage.setItem(DAILY_REMINDER, JSON.stringify(true))
                }
            })
        }
    })
}
