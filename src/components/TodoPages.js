import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const dummyData = [
    {_id : 1, title : "Task 1", desc : "do the thing that in task 1"},
    {_id : 2, title : "Task 2", desc : "do the thing that in task 2"},
    {_id : 3, title : "Task 3", desc : "do the thing that in task 3"},
    {_id : 4, title : "Task 4", desc : "do the thing that in task 4"},
    {_id : 5, title : "Task 5", desc : "do the thing that in task 5"},
]

const TodoPages = () => {
    const [todos, setTodos] = useState(dummyData);

    const handleDelete = (id) => {
        const newTodos = todos.filter((todo)=> todo._id !== id);
        setTodos(newTodos);
    }

    const handleSubmit = (value, descValue) => {
        const title = value; 
        const desc = descValue;
        // const listOfIds = todos.map(todo => todo._id);
        // const id = Math.max(listOfIds) + 1;
        const id = todos.length + 1;
        todos.push(
            {
                _id : id,
                title,
                desc
            }
        );
        setTodos([...todos]); 
    }

    return(
        <div className="todo-pages">
            <TodoForm
                handleSubmit={handleSubmit}
            />
            <TodoList todos ={todos} handleDelete = {handleDelete}/>
        </div>
    )
}

export default TodoPages;