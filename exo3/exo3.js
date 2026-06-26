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
const defaultValues = {
    cards: [],
    timer: 0,
    attempts: 0,
    prev: null,
    wait: false,
    intervalId: null
}
const game = {...defaultValues}

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
        if(game.wait) {
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
    game.cards = [...values, ...values].map(v => ({
        value: v,
        isVisible: false,
        randomSeed: Math.random()
    })).toSorted((v1, v2) => v1.randomSeed - v2.randomSeed)
    .map((c, idx) => ({ value: c.value, isVisible: c.isVisible, position: idx }))
}

function displayCards() {
    gameBoard.innerHTML = ''
    gameBoard.append(...game.cards.map(createEmptyCardElement))
}

/**
 * @param {([Card, Card]) => void} callBack 
 */
function pairWise(callBack) {
    return (/** @type {PointerEvent} */e) => {
        const idx = e.currentTarget.dataset.idx
        card = game.cards[idx]
        if (!game.prev) {
            game.prev = card
            return
        }
        if (card === game.prev) {
            return
        }
        callBack([game.prev, card])
        game.prev = null
    } 
}

/**
 * @param {[Card, Card]} param0 
 */
function check([card1, card2]) {
    displayAttempts(++game.attempts)
    if(card1.value !== card2.value) {
        const cardElement1 = gameBoard.children[card1.position]
        const cardElement2 = gameBoard.children[card2.position]
        game.wait = true
        setTimeout(() => {
            closeCard(card1, cardElement1)
            closeCard(card2, cardElement2)
            game.wait = false
        }, 1000)
    } else if(game.cards.every(c => c.isVisible)) {
        clearInterval(game.intervalId)
    }
}

function displayAttempts() {
    attemptsSpan.textContent = game.attempts
}

function displayTime() {
    const diff = Date.now() - game.timer
    const minutes = Math.floor(diff / 60000).toString().padStart(2, '0')
    const seconds = (Math.floor(diff / 1000) % 60).toString().padStart(2, '0')
    const ms = (diff % 1000).toString().padStart(3, '0')
    timerSpan.textContent = `${minutes}:${seconds}:${ms}`
}

async function reset() {
    const started = game.cards.some(c => !c.isVisible)
    if(started) {
        const result = await openConfirmDialog()
        if (result) {
            applyReset()   
        }
    } else {
        applyReset()
    }
}

function applyReset() {
    clearInterval(game.intervalId)
    Object.assign(game, { ...defaultValues, timer: Date.now() })
    shuffle()
    displayCards()
    displayAttempts()
    game.intervalId = setInterval(displayTime, 1)
    gameBoard.querySelectorAll('.card')
        .forEach(c => c.addEventListener('click', pairWise(check)))
}

/**
 * @returns { Promise<boolean> }
 */
function openConfirmDialog() {
    return new Promise((resolve) => {
        const dialogBackdrop = document.createElement('div')
        dialogBackdrop.classList.add('dialog-backdrop')
        const dialog = document.createElement('div')
        dialog.classList.add('dialog')
        const p = document.createElement('p')
        p.textContent = 'Are you sure ?'
        const cancelButton = document.createElement('button')
        cancelButton.textContent = 'Cancel'
        const okButton = document.createElement('button')
        okButton.textContent = 'Yes'
        dialog.append(p, cancelButton, okButton)
        dialogBackdrop.append(dialog)
        okButton.addEventListener('click', _ => {
            dialogBackdrop.remove();
            resolve(true)
        })
        cancelButton.addEventListener('click', _ => {
            dialogBackdrop.remove()
            resolve(false)
        })
        document.body.append(dialogBackdrop)
    })
}

resetBtn.addEventListener('click', reset)
})()

