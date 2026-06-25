/**
 * @typedef {{name: string, dev: string, endDate: Date, important: boolean}} Task
 */

// DOM
/** @type {HTMLFormElement} */
const form = document.getElementById('form')
/** @type {HTMLInputElement} */
const inputTaskName = document.getElementById('input-task-name')
/** @type {HTMLInputElement} */
const selectDev = document.getElementById('select-dev')
/** @type {HTMLInputElement} */
const inputEndDate = document.getElementById('input-end-date')
/** @type {HTMLInputElement} */
const inputTaskImportant = document.getElementById('input-task-important')
/** @type {HTMLButtonElement} */
const btnAdd = document.getElementById('btn-add')
/** @type {HTMLElement} */
const tbodyTasks = document.getElementById('tbody-tasks')
/** @type {HTMLElement} */
const sortButtons = document.querySelector('#sort-buttons')

/** @type {Task[]} */
const tasksList = []
// events
btnAdd.addEventListener('click', _ => {
    const task = {
        name: inputTaskName.value,
        dev: selectDev.value,
        endDate: inputEndDate.valueAsDate,
        important: inputTaskImportant.checked
    }
    if(!task.name.trim() || !task.dev || !task.endDate) {
        return
    }
    tasksList.push(task)
    tbodyTasks.append(createRow(task))
    form.reset()
})


sortButtons.addEventListener('click', e => {
    const dset = e.target.dataset
    if(!tasksList.length) return
    let sortedList        
    if(typeof tasksList[0][dset.sort] === 'string'){
        sortedList = tasksList.toSorted((a, b) => b[dset.sort].localeCompare(a[dset.sort]) * dset.order)
    } else {
        sortedList = tasksList.toSorted(
            (a, b) => a[dset.sort] < b[dset.sort] 
                ? dset.order 
                : -1 * dset.order
        )
    }
    tbodyTasks.innerHTML = ''
    tbodyTasks.append(...sortedList.map(createRow))
})

/**
 * @param {Task} task 
 * @returns { HTMLTableRowElement }
 */
function createRow(task) {
    const row = document.createElement('tr')
    const tdName = document.createElement('td')
    const tdDev = document.createElement('td')
    const tdDate = document.createElement('td')
    const tdActions = document.createElement('td')
    const deleteBtn = document.createElement('button')
    tdName.textContent = task.name
    tdDev.textContent = task.dev
    tdDate.textContent = task.endDate.toLocaleDateString()
    deleteBtn.textContent = 'Remove'
    tdActions.append(deleteBtn)
    row.append(tdName, tdDev, tdDate, tdActions)
    task.important && row.classList.add('important')
    deleteBtn.addEventListener('click', _ => {
        row.remove()
    })
    return row
}