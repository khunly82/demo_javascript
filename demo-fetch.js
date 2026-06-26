"use strict";

(async () => {

const selectCountries = document.getElementById('select-country')
const inputName = document.getElementById('input-name')
const checkButton = document.getElementById('btn-check')
const result = document.getElementById('result')

async function getAllCountries() {
    const countries = await fetch('https://countries.dev/countries')
        .then(result => result.json())
    return countries.map(c => ({
        name: c.name,
        code: c.alpha2Code
    }))
}

function createCountryOption(c) {
    const o = document.createElement('option')
    o.value = c.code
    o.textContent = c.name
    return o
}

async function getInfos() {
    const paramsObj = {
        name: inputName.value,
        country_id: selectCountries.value
    }
    const params = new URLSearchParams(paramsObj).toString()
    const [data1, data2] = await Promise.all([
        fetch('https://api.agify.io?' + params).then(r => r.json()),
        fetch('https://api.genderize.io?' + params).then(r => r.json())
    ])
    result.textContent = `The name ${inputName.value} is ${data2.gender} name and the approximative age is ${data1.age}`
}

checkButton.addEventListener('click', getInfos)

selectCountries.append(...(await getAllCountries()).map(createCountryOption))

})()