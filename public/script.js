const taskDiv = document.getElementById('tasks')
const form = document.getElementById('form');
const taskInput = document.getElementById('input-task');
let edit = false;
let IDtobeEdit = 0;

const render = (tasks) => {
    const tasksHTMLarray = tasks.map(task => {
        if (task.done) {
            return `<div class="flex justify-space-between pd-medium">
            <div key="${task.id}">
                <i class="fa-regular fa-square-check" onclick="toggleCheck(${task.id})"></i>
                <span class="line-through">${task.task}</span>
            </div>
            <div>
                <i class="fa-regular fa-pen-to-square" onclick="editTask(${task.id},'${task.task}')"></i>
                <i class="fa-solid fa-xmark" onclick="deleteTask(${task.id})"></i>
            </div>
        </div>`
        } else {
            return `<div class="flex justify-space-between pd-medium">
            <div key="${task.id}">
                <i class="fa-regular fa-square" onclick="toggleCheck(${task.id})"></i>
                <span>${task.task}</span>
            </div>
            <div>
                <i class="fa-regular fa-pen-to-square" onclick="editTask(${task.id},'${task.task}')"></i>
                <i class="fa-solid fa-xmark" onclick="deleteTask(${task.id})"></i>
            </div>
        </div>`
        }
    })
    const tasksHTML = tasksHTMLarray.join(" ");
    taskDiv.innerHTML = tasksHTML;
}

const getAllTasks = async () => {
    const { data } = await axios.get('/todo');
    const tasks = data.data;
    render(tasks);
}

const deleteTask = async (id) => {
    const { data } = await axios.post('/todoDelete', { id: id });
    const task = data.data;
    render(task);
}

const toggleCheck = async (id) => {
    const { data } = await axios.put('/done', { id: id });
    const task = data.data;
    render(task);
}

const editTask = (id, task) => {
    edit = true;
    IDtobeEdit = id;
    taskInput.value = task;
    taskInput.focus();
}

form.addEventListener('submit', async (e) => {
    if (edit) {
        e.preventDefault();
        edit = false;
        const { data } = await axios.put('/todo', { id: IDtobeEdit, task: taskInput.value });
        taskInput.value = "";
        const task = data.data;
        render(task);
    } else {
        e.preventDefault();
        const { data } = await axios.post('/todo', { task: taskInput.value });
        taskInput.value = "";
        const task = data.data;
        render(task);
    }
})

document.addEventListener('keypress', function (event) {
    if (event.key === '/' && document.activeElement !== taskInput) {
        event.preventDefault();
        taskInput.focus();
    }
});

getAllTasks();