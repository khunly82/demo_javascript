"use strict"

// let name = 'Khun'

// let str 
//     // = 'hello world'
//     // = "Hello world"
//     = `Hello ${name}` // Hello Khun

// let w = null
// let v

// console.log(typeof w) // object
// console.log(typeof v) // undefined


// let obj = { id: 42, name: 'Ly', birthdate: new Date() }
// console.log(typeof obj)

// console.log(obj['id'])
// console.log(obj.id)


// let value = 74 / 'twelve'
// console.log(value)

// console.log(value == NaN) // false
// console.log(isNaN(value)) // true

const myP = document.getElementById('my-p')

myP.textContent = 'Hello world !!'
myP.classList.add('some-class')
myP.style.color = '#FF0000'

const p = document.querySelector('p')
p.style.fontWeight = 'bold'

const ps = document.querySelectorAll('p')
for (let item of ps) {
    item.style.fontStyle = 'italic'
}

console.log(document.body.children)

const myInput = document.getElementById('my-input')
const myInput2 = document.getElementById('my-input-2')
const myInput3 = document.getElementById('my-input-3')
myInput.value = 'Khun'

console.log(typeof myInput2.value) // string
console.log(typeof myInput2.valueAsNumber) // number
console.log(typeof myInput3.value) // string
console.log(typeof myInput3.valueAsDate) // date

console.log(+myInput2.value + 42) // 4242
console.log(myInput2.valueAsNumber + 42) // 4242

myP.textContent = myInput3.valueAsDate.toLocaleDateString()

const computeDateBtn = document.getElementById('compute-date-btn')
const pResult = document.getElementById('p-result')

computeDateBtn.addEventListener('click', () => {
    /** @type {Date} */
    const date = myInput3.valueAsDate
    const nbDays = myInput2.valueAsNumber
    date.setDate(date.getDate() + nbDays)
    pResult.textContent = `The date is ${date.toLocaleDateString()}`
})