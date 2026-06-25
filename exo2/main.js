// DOM
/** @type {HTMLFormElement} */
const form = document.getElementById('form')
const inputTaskName = document.getElementById('input-task-name')
const selectDev = document.getElementById('select-dev')
/** @type {HTMLInputElement} */
const inputEndDate = document.getElementById('input-end-date')
/** @type {HTMLInputElement} */
const inputTaskImportant = document.getElementById('input-task-important')
const btnAdd = document.getElementById('btn-add')
const tbodyTasks = document.getElementById('tbody-tasks')
const sortButtons = document.querySelectorAll('#sort-buttons > button')

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


for (const element of sortButtons) {
    element.addEventListener('click', e => {
        const dset = e.currentTarget.dataset
        if(!tasksList.length) {
            return
        }
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
        // for(const t of sortedList) {
        //     tbodyTasks.append(createRow(t))
        // }
        // console.log(sortedList.map(createRow))
        tbodyTasks.append(...sortedList.map(createRow))
    })
}

/**
 * @param {{ name: string, dev: string, endDate: Date, important: boolean }} task 
 * @returns 
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
    // if(task.important) {
    //     row.classList.add('important')
    // }
    deleteBtn.addEventListener('click', _ => {
        row.remove()
    })
    return row
}