import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import EditForm from './EditForm';
import {fetchTodos, postTodo, editTodo, deleteTodo} from '../services/TodoServices';

const dummyData = [
    {_id : 1, title : "Task 1", desc : "do the thing that in task 1"},
    {_id : 2, title : "Task 2", desc : "do the thing that in task 2"},
    {_id : 3, title : "Task 3", desc : "do the thing that in task 3"},
    {_id : 4, title : "Task 4", desc : "do the thing that in task 4"},
    {_id : 5, title : "Task 5", desc : "do the thing that in task 5"},
]

const defaultData = {_id:'', title:'', desc:''};

const TodoPages = () => {
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState(defaultData);
    
    useEffect(() => {
        const setupData = async()=> {
            const data = await fetchTodos();
            setTodos(data);
        };
        setupData();
    }, []) 

    const handleDelete = async(id) => {
        await deleteTodo(id);
        const newTodos = todos.filter((todo)=> todo._id !== id);
        setTodos(newTodos);
    }

    const handleSubmit = async(title, desc) => {
        const result = await postTodo(title, desc);
        setTodos([...todos,result]);
    }

    const handleUpdate = async(id, title, desc) => {
        const editedTodo = await editTodo(id, title, desc);
        const newTodos = todos.map(todo => {
            if (todo._id === id) {
                return editedTodo;
            }
            return todo;
        });
        
        setTodos(newTodos);
        setFormData(defaultData);
    }

    const setEditTodo = (id) => {
        const findData = todos.find(todo => todo._id == id);
        setFormData(findData);
    }

    return(
        <div className="todo-pages">
            <TodoForm
                handleSubmit={handleSubmit}
            />
            
            {formData?._id && <EditForm handleUpdate={handleUpdate} todo={formData}/>}
            
            <TodoList todos ={todos} handleDelete = {handleDelete} handleEdit={setEditTodo}/>
        </div>
    )
}

export default TodoPages;