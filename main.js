const btn = document.getElementById('btn-add');
const boxText = document.getElementById('box-text');
const tarefa = document.getElementById('list');
const boxTitle = document.getElementById('box-title');

document.addEventListener('DOMContentLoaded', loadTasks);

btn.addEventListener('click', function (e) {
    const newTitle = boxTitle.value;
    const newText = boxText.value;

    if (newTitle == '') {
        return alert('Título em branco');
    }
    if (newText == '') {
        return alert('Tarefa em branco');
    }

    const newElement = createTaskElement(newTitle, newText);
    tarefa.appendChild(newElement);

    const btnDel = newElement.querySelector('.btn-del');

    btnDel.addEventListener('click', function () {
        tarefa.removeChild(newElement);
  
        saveTasksToLocalStorage();

        removeTaskFromLocalStorage(newElement);
    });


    saveTasksToLocalStorage();

    boxText.value = '';
    boxTitle.value = '';
});

function createTaskElement(title, text) {
    const newElement = document.createElement('li');
    newElement.innerHTML = `
        <h2>${title}</h2>
        <span>${text}</span>
        <i class="material-icons btns btn-del">delete_forever</i>
    `;
    return newElement;
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(tarefa.children).map(task => ({
        title: task.querySelector('h2').textContent,
        text: task.querySelector('span').textContent,
    }));

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const newElement = createTaskElement(task.title, task.text);
        tarefa.appendChild(newElement);
        
        const btnDel = newElement.querySelector('.btn-del');
        
        btnDel.addEventListener('click', function () {
            tarefa.removeChild(newElement);
          
            saveTasksToLocalStorage();
            
            removeTaskFromLocalStorage(newElement);
        });
    });
}

function removeTaskFromLocalStorage(element) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

   
    const indexToRemove = savedTasks.findIndex(task => 
        task.title === element.querySelector('h2').textContent &&
        task.text === element.querySelector('span').textContent);

    if (indexToRemove !== -1) {
        savedTasks.splice(indexToRemove, 1);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    }
}
