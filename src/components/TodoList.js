import React from 'react';

const TodoList = ({todos, handleDelete}) => {


    return(
        <div className="todo-list">
            <ul>
                {todos && todos.map(({ _id, title, desc}) => 
                <li key={_id} className="task">{_id}-{title} - {desc} 
                <button className="del-btn" onClick={() => handleDelete(_id)}>
                    Delete
                </button>
                </li>)}
            </ul>
        </div>
    )
}

export default TodoList;