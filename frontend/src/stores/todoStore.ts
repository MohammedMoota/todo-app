import { defineStore } from 'pinia'
import { ref } from 'vue'

// Todo type
interface Todo {
  id: string
  text: string
  completed: boolean
}

const API = 'http://localhost:3000'

export const useTodoStore = defineStore('todo', () => {

  // State
  const todos = ref<Todo[]>([])
  const selectedIds = ref<string[]>([])

  // GET — fetch all todos
  async function fetchTodos() {
    const response = await fetch(`${API}/todos`)
    todos.value = await response.json()
  }

  // POST — add new todo
  async function addTodo(text: string) {
    const response = await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    const newTodo = await response.json()
    todos.value.push(newTodo)
  }

  // PUT — toggle complete
  async function toggleTodo(id: string) {
    const response = await fetch(`${API}/todos/${id}`, {
      method: 'PUT'
    })
    const updatedTodo = await response.json()
    const index = todos.value.findIndex(t => t.id === id)
    todos.value[index] = updatedTodo
  }

  // DELETE — delete single todo
  async function deleteTodo(id: string) {
    await fetch(`${API}/todos/${id}`, {
      method: 'DELETE'
    })
    todos.value = todos.value.filter(t => t.id !== id)
    selectedIds.value = selectedIds.value.filter(i => i !== id)
  }

  // Toggle selection of a todo
  function toggleSelect(id: string) {
    if (selectedIds.value.includes(id)) {
      selectedIds.value = selectedIds.value.filter(i => i !== id)
    } else {
      selectedIds.value.push(id)
    }
  }

  // DELETE — delete selected todos in bulk
  async function deleteSelected() {
    if (selectedIds.value.length === 0) return

    await fetch(`${API}/todos/bulk`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedIds.value })
    })

    todos.value = todos.value.filter(t => !selectedIds.value.includes(t.id))
    selectedIds.value = []
  }

  return { todos, selectedIds, fetchTodos, addTodo, toggleTodo, deleteTodo, toggleSelect, deleteSelected }
})