import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
/*  React manages states inside of your app so when that state changes it rerenders things for us
we want to store all of our to dos inside of a state
We want to manage side effects and we do this using useEffect (another hook inside in react)
<> this is a fragment which allows us to return more than one thing 
Use ref allows us to reference elements inside of our html 
*/
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const STORAGE_KEY = 'todoApp.todo'

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) //whenever something in this array changes we run this useEffect function

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos => {
      return[...prevTodos, {id: uuidv4(), name: name, complete: false}]
      })
    todoNameRef.current.value = null //clears text input 
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos = {todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"></input>
    <button onClick={handleAddTodo}> Add to do </button>
    <button> onClick={handleClearTodos} Clear to do </button>
    <div> {todos.filter(todo => !todo.complete).length} left to do </div>
    </>
  )
}

export default App;
