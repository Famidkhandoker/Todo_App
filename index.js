// Find the elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

// Show message
const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`); 

    setTimeout(() => {
        messageElement.textContent = ""; 
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);
};

// Create Todo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
        <span>${todoValue}</span>
        <span>
            <button class="btn" id="deleteButton">
                <i class="fa fa-trash"></i>
            </button>
        </span>`;

    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo);
};

// Delete Todo
const deleteTodo = (event) => {
    const selectedTodo = event.target.closest("li"); 

    if (selectedTodo) {
        todoLists.removeChild(selectedTodo);
        showMessage("Todo is deleted", "danger");

        // Update local storage
        let todos = getTodosFromLocalStorage();
        todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
        localStorage.setItem("mytodos", JSON.stringify(todos));
    }
};

// Get Todos from Local Storage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos")
        ? JSON.parse(localStorage.getItem("mytodos"))
        : [];
};

// Add Todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value.trim();
    if (!todoValue) {
        showMessage("Please enter a todo", "warning");
        return;
    }

    // Unique ID
    const todoId = Date.now().toString();
    createTodo(todoId, todoValue);
    showMessage("Todo is added", "success");

    // Add to localStorage
    const todos = getTodosFromLocalStorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value = "";
};

// Load Todos
const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.forEach((todo) => createTodo(todo.todoId, todo.todoValue)); 
};

// Adding listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
