(() => {
    /**
 * @typedef { { value: string, isVisible: boolean, position: number } } Card
 */

/** @type {HTMLElement} */
const timerSpan = document.getElementById('timer')
/** @type {HTMLElement} */
const attemptsSpan = document.getElementById('attempts')
/** @type {HTMLButtonElement} */
const resetBtn = document.getElementById('btn-reset')
/** @type {HTMLElement} */
const gameBoard = document.getElementById('game-board')

const values = ['🍔', '👻', '🦄', '🐕', '🐱', '💩', '🐵', '🦁']

/** @type {Card[]} */
let cards = []
/** @type {number} */
let timer = 0
/** @type {number} */
let attempts = 0
/** @type {card} */
let prev = null
/** @type {boolean} */
let wait = false
let intervalId = null

/**
 * @param {Card} card
 * @returns {HTMLElement}
 */
function createEmptyCardElement(card) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.dataset.idx = card.position
    const frontElement = document.createElement('div')
    frontElement.classList.add('front')
    const backElement = document.createElement('div')
    backElement.classList.add('back')
    cardElement.append(frontElement, backElement)
    cardElement.addEventListener('click', openCard(card, cardElement))
    return cardElement
}

function openCard(card, cardElement) {
    return (/** @type {PointerEvent} */e) => {
        if(wait) {
            e.stopImmediatePropagation()
            return
        }
        
        if(card.isVisible) return;
            card.isVisible = true
            cardElement.classList.add('open')
            frontElement = cardElement.querySelector('.front')
            frontElement.textContent = card.value
    }
}

function closeCard(card, cardElement) {
    if(!card.isVisible) return
        card.isVisible = false
        cardElement.classList.remove('open')
        frontElement = cardElement.querySelector('.front')
        frontElement.textContent = ''
}

function shuffle() {
    cards = []
    cards = [...values, ...values].map(v => ({
        value: v,
        isVisible: false,
        randomSeed: Math.random()
    })).toSorted((v1, v2) => v1.randomSeed - v2.randomSeed)
    .map((c, idx) => ({ value: c.value, isVisible: c.isVisible, position: idx }))
}

function displayCards() {
    gameBoard.innerHTML = ''
    gameBoard.append(...cards.map(createEmptyCardElement))
}

/**
 * @param {([Card, Card]) => void} callBack 
 */
function pairWise(callBack) {
    return (/** @type {PointerEvent} */e) => {
        const idx = e.currentTarget.dataset.idx
        card = cards[idx]
        if (!prev) {
            prev = card
            return
        }
        if (card === prev) {
            return
        }
        callBack([prev, card])
        prev = null
    } 
}

/**
 * @param {[Card, Card]} param0 
 */
function check([card1, card2]) {
    displayAttempts(++attempts)
    if(card1.value !== card2.value) {
        const cardElement1 = gameBoard.children[card1.position]
        const cardElement2 = gameBoard.children[card2.position]
        wait = true
        setTimeout(() => {
            closeCard(card1, cardElement1)
            closeCard(card2, cardElement2)
            wait = false
        }, 1000)
    } else if(cards.every(c => c.isVisible)) {
        clearInterval(intervalId)
    }
}

function displayAttempts() {
    attemptsSpan.textContent = attempts
}

function displayTime() {
    const diff = Date.now() - timer
    const minutes = Math.floor(diff / 60000).toString().padStart(2, '0')
    const seconds = (Math.floor(diff / 1000) % 60).toString().padStart(2, '0')
    const ms = (diff % 1000).toString().padStart(3, '0')
    timerSpan.textContent = `${minutes}:${seconds}:${ms}`
}

function reset() {
    cards = []
    timer = Date.now()
    attempts = 0
    prev = null
    wait = false
    shuffle()
    displayCards()
    displayAttempts()
    intervalId = setInterval(displayTime, 1)
    gameBoard.querySelectorAll('.card')
        .forEach(c => c.addEventListener('click', pairWise(check)))
}

resetBtn.addEventListener('click', reset)
})()

