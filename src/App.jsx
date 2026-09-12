import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { TodoProvider } from './contexts/Index'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todos) => {
    setTodos((prevTodos) => [...prevTodos, { id: Date.now(), ...todos }])
  }

  const updateTodo = (id, todo) => {
    setTodos((prevTodo) => prevTodo.map((element) => element.id === id ? todo : element))
  }

  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((element) => element.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((prevTodo) => prevTodo.map((element) => element.id === id ? { ...element, completed: !element.completed } : element))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ addTodo, updateTodo, deleteTodo, toggleTodo, todos }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
