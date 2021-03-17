import React from 'react';

const TodoList = ({todos, handleDelete, handleEdit}) => {
    return(
        <div className="todo-list">
            <ul>
                {todos.length && todos.map(({ _id, title, desc}) => 
                <li key={_id} className="task">{title} - {desc} 
                <button className="del-btn" onClick={() => handleDelete(_id)}>
                    Delete
                </button>
                <button onClick={() => handleEdit(_id)}>
                    edit
                </button>
                </li>)}
            </ul>
        </div>
    )
}

export default TodoList;