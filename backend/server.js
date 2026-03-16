const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000
const todosPath = path.join(__dirname, 'todos.json')

// Helper: read todos from file
function readTodos() {
  try {
    const data = fs.readFileSync(todosPath, 'utf-8')
    return data.trim() ? JSON.parse(data) : []
  } catch (err) {
    return []
  }
}

// Helper: write todos to file
function writeTodos(todos) {
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2))
}

// Helper: send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    sendJSON(res, 204, {})
    return
  }

  // GET /todos — get all todos
  if (req.method === 'GET' && req.url === '/todos') {
    const todos = readTodos()
    sendJSON(res, 200, todos)
    return
  }

  // POST /todos — add new todo
  if (req.method === 'POST' && req.url === '/todos') {
    let body = ''

    req.on('data', chunk => { body += chunk })

    req.on('end', () => {
      const { text } = JSON.parse(body)
      const todos = readTodos()

      const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false
      }

      todos.push(newTodo)
      writeTodos(todos)
      sendJSON(res, 201, newTodo)
    })
    return
  }

  // PUT /todos/:id — toggle complete
  if (req.method === 'PUT' && req.url.startsWith('/todos/')) {
    const id = req.url.split('/')[2]
    const todos = readTodos()
    const todo = todos.find(t => t.id === id)

    if (!todo) {
      sendJSON(res, 404, { message: 'Todo not found' })
      return
    }

    todo.completed = !todo.completed
    writeTodos(todos)
    sendJSON(res, 200, todo)
    return
  }

  // DELETE /todos/bulk — delete multiple todos
  if (req.method === 'DELETE' && req.url === '/todos/bulk') {
    let body = ''

    req.on('data', chunk => { body += chunk })

    req.on('end', () => {
      const { ids } = JSON.parse(body)
      const todos = readTodos()
      const newTodos = todos.filter(t => !ids.includes(t.id))

      writeTodos(newTodos)
      sendJSON(res, 200, { message: 'Deleted' })
    })
    return
  }

  // DELETE /todos/:id — delete todo
  if (req.method === 'DELETE' && req.url.startsWith('/todos/')) {
    const id = req.url.split('/')[2]
    const todos = readTodos()
    const newTodos = todos.filter(t => t.id !== id)

    writeTodos(newTodos)
    sendJSON(res, 200, { message: 'Deleted' })
    return
  }

  // Route not found
  sendJSON(res, 404, { message: 'Route not found' })
})

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})