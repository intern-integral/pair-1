import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import EditForm from './EditForm';
import {fetchTodos} from '../services/TodoServices';

const dummyData = [
    {_id : 1, title : "Task 1", desc : "do the thing that in task 1"},
    {_id : 2, title : "Task 2", desc : "do the thing that in task 2"},
    {_id : 3, title : "Task 3", desc : "do the thing that in task 3"},
    {_id : 4, title : "Task 4", desc : "do the thing that in task 4"},
    {_id : 5, title : "Task 5", desc : "do the thing that in task 5"},
]

const defaultData = {_id:'', title:'', desc:''};

const TodoPages = ({}) => {
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState(defaultData);
    
    const setupData = async () => {
        await setTodos(await fetchTodos())
    };
    // commit bruh!
    // git add .
    // git commint -m "[Kenny, Nabeel] add fetch data"
    // git push origin exercise
    useEffect(async () => {
        setupData();
    }, []) 

    const handleDelete = (id) => {
        const newTodos = todos.filter((todo)=> todo._id !== id);
        setTodos(newTodos);
    }

    const handleSubmit = (value, descValue) => {
        const title = value; 
        const desc = descValue;
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

    const handleUpdate = (id, editValue, editDescValue) => {
        const newTodos = todos.map(todo => {
            if (todo._id === id) {
                return {_id : id, title : editValue, desc : editDescValue}
            }
            return todo;
        });

        setTodos([...newTodos]);
        setFormData(defaultData);
    }

    const setEditTodo = (id) => {
        const findData = todos.find(todo => todo._id == id);
        setFormData(findData);
    }

//    {formData?._id && <EditForm handleUpdate={handleUpdate} todo={formData}/>}
//<EditForm handleUpdate={handleUpdate} todo={formData}/>
    return(
        <div className="todo-pages">
            <TodoForm
                handleSubmit={handleSubmit}//ini buat component baru yak?
                //handleUpdate={handleUpdate}
                //todo={formData}
            />
            
            {formData?._id && <EditForm handleUpdate={handleUpdate} todo={formData}/>}
            
            <TodoList todos ={todos} handleDelete = {handleDelete} handleEdit={setEditTodo}/>
        </div>
    )
}

export default TodoPages;