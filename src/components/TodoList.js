import React from 'react';

const TodoList = ({todos, handleDelete, handleEdit}) => {
    return(        
        <div className="todo-list">
            <ul>
                {todos.length && todos.map((todo) => 
                    <li key={todo._id} className="task">{todo.title} - {todo.desc} 
                    <button className="del-btn" onClick={() => handleDelete(todo._id)}>
                        Delete
                    </button>
                    <button className="edit-btn" onClick={() => handleEdit(todo._id)}>
                        edit
                    </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default TodoList;