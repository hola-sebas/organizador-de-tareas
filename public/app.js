document.getElementById('formTask').addEventListener('submit', saveTask)

function saveTask(info) {
    info.preventDefault()
    let title = document.getElementById('title').value
    let descripcion = document.getElementById('descripcion').value
    if (!title.length) return alert('Debes poner un titulo')
    if (!descripcion.length) return alert('Debes poner una descripcion')
    const task = {
        titulo: title,
        description: descripcion
    }
    if (localStorage.getItem('tasks') == null) {
        let tasks = []
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    getTasks()
    document.getElementById('formTask').reset()
}


function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    let tasksView = document.getElementById('tasks')

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].titulo
        let description = tasks[i].description
        tasksView.innerHTML += `<div class="card mb-2 bg-transparent">
        <div class="body p-3">
        <p class="card bg-transparent text-white text-center">${title}</p>
        <p class="text-white pt-1">${description}</p>
        <a class="btn btn-success" onClick="deleteTask(${i})">Ok</a>
        </div>
        </div>`

    }
}
function deleteTask(i) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.splice(i, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    getTasks()
    return
}

getTasks()