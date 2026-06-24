/***** EXO 1.1 *****/
const inputHeight = document.getElementById('input-height')
const inputWeight = document.getElementById('input-weight')
const btnComputeBMI = document.getElementById('btn-compute-bmi')
const pBmiResult = document.getElementById('p-bmi-result')

btnComputeBMI.addEventListener('click', () => {
    const height = inputHeight.valueAsNumber / 100
    const weight = inputWeight.valueAsNumber
    const bmi = weight / height**2
    pBmiResult.textContent = `Your bmi is `
    const spanBMI = document.createElement('span')
    spanBMI.textContent = bmi.toFixed(2)
    spanBMI.classList.add(bmi >= 18.5 && bmi < 25 ? 'text-green' : 'text-red')
    pBmiResult.append(spanBMI)
})

/***** END EXO 1.1 *****/


/***** EXO 1.2 *****/
const inputBd = document.getElementById('input-bd')
const btnComputeAge = document.getElementById('btn-compute-age')
const pAgeResult = document.getElementById('p-age-result')

btnComputeAge.addEventListener('click', _ => {
    const today = new Date() // today date
    /** @type {Date} */
    const birthDate = inputBd.valueAsDate
    let age = today.getFullYear() - birthDate.getFullYear()
    const bdYear = birthDate.setFullYear(today.getFullYear())
    if(bdYear > today) {
        age--;
    }
    let month = (12 + today.getMonth() - birthDate.getMonth()) % 12

    let dayDiff = today.getDate() - birthDate.getDate()

    if(dayDiff < 0) {
        month--
        let previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        dayDiff += previousMonth.getDate();
    }

    const pYear = document.createElement('p')
    pYear.textContent = `${age} years`
    const pMonth = document.createElement('p')
    pMonth.textContent = `${month} months`
    const pDay = document.createElement('p')
    pDay.textContent = `${dayDiff} days`
    pAgeResult.innerHTML = ''
    pAgeResult.append(pYear, pMonth, pDay)

})
/***** END EXO 1.2 *****/


/***** EXO 1.3 *****/
const breakHour = 15
const breakMinute = 0
const pRemainingTime = document.getElementById('p-remaining-time')

let current_day = new Date()
const break_day = new Date(
    current_day.getFullYear(), 
    current_day.getMonth(),
    current_day.getDate(),
    breakHour,
    breakMinute
)

setInterval(() => {
    current_day = new Date()
    const diff = break_day - current_day
    if(diff >= 0) {
        // display the remaining time
        const totalSecondsRemaining = Math.floor(diff / 1000)
        const secondsRemaining = totalSecondsRemaining % 60
        const minutesRemaining = Math.floor(totalSecondsRemaining / 60) % 60  
        const hoursRemaining = Math.floor(totalSecondsRemaining / 3600)
        const timeToDisplay = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`
        pRemainingTime.textContent = timeToDisplay
    } else {
        // display it's time to take a break
        pRemainingTime.textContent = 'it\'s time to take a break'
    }
}, 1000);


/***** END EXO 1.3 *****/