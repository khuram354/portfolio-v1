// ===== STATE =====
let todos = [];
let currentFilter = "all";

// ===== DOM ELEMENTS =====
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterBtns = document.querySelectorAll(".filter-btn");

// ===== INIT =====
loadTodos();

// ===== EVENT LISTENERS =====
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// ===== ADD TODO =====
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        todoInput.style.borderColor = "#ff4757";
        setTimeout(() => (todoInput.style.borderColor = ""), 1000);
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
    todoInput.focus();
}

// ===== TOGGLE COMPLETE =====
function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// ===== DELETE TODO =====
function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTodos();
}

// ===== CLEAR COMPLETED =====
function clearCompleted() {
    todos = todos.filter((t) => !t.completed);
    saveTodos();
    renderTodos();
}

// ===== FILTER TODOS =====
function getFilteredTodos() {
    if (currentFilter === "active") {
        return todos.filter((t) => !t.completed);
    } else if (currentFilter === "completed") {
        return todos.filter((t) => t.completed);
    }
    return todos;
}

// ===== RENDER TODOS =====
function renderTodos() {
    const filtered = getFilteredTodos();

    if (filtered.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                ${todos.length === 0 ? "✨ No tasks yet. Add one above!" : "🎯 No tasks in this filter."}
            </div>
        `;
    } else {
        todoList.innerHTML = filtered
            .map(
                (todo) => `
            <li class="todo-item" data-id="${todo.id}">
                <span class="todo-text ${todo.completed ? "completed" : ""}" onclick="toggleTodo(${todo.id})">
                    ${todo.text}
                </span>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">✕</button>
            </li>
        `,
            )
            .join("");
    }

    // Update stats
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    taskCount.textContent = `${total} task${total !== 1 ? "s" : ""} (${completed} completed)`;
}

// ===== LOCAL STORAGE =====
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const saved = localStorage.getItem("todos");
    if (saved) {
        todos = JSON.parse(saved);
    }
    renderTodos();
}

// ===== KEYBOARD SHORTCUT (Escape to clear) =====
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        todoInput.value = "";
        todoInput.blur();
    }
});
