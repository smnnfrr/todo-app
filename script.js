const input = document.getElementById('todoInput');
const addButton = document.getElementById('addTodoButton');
const list = document.getElementById('todoList');
//load saved todos from local storage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
   // save todos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Make node for individual todo
function createTodoNode(todo, index) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // Checkbox event listener
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        // Strike-thru text when todo completed
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
    });

    // Double click to edit the todo
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt('Edit todo:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    }); 

    // Delete todo 
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1); // Fixed typo from 'todo.spilce' to 'todos.splice'
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

// Whenver we want to add or delete a todo this function will be called 
function render() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (text === '') { 
        return; 
    }
    
    todos.push({ text, completed: false }); 
    input.value = '';
    render();
    saveTodos();
}

addButton.addEventListener('click', addTodo);
render();
