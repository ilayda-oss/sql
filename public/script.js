const todoForm = document.getElementById('todo-form');
const todoText = document.getElementById('todo-text');
const todosList = document.getElementById('todos');

todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const text = todoText.value;

  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      todoText.value = '';
      fetchTodos();
    } else {
      console.error('Error adding todo');
    }
  } catch (error) {
    console.error(error);
  }
});

async function fetchTodos() {
  try {
    const response = await fetch('/api/todos');
    const todos = await response.json();

    todosList.innerHTML = todos.map(todo => `<li>${todo.text}</li>`).join('');
  } catch (error) {
    console.error(error);
  }
}

fetchTodos();
