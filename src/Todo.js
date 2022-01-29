import React from 'react'

export default function Todo({ todo, toggleTodo }){

    function handleTodo(){
        toggleTodo(todo.is)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodo}/>
                {todo.name}
            </label>
        </div>
    )
}