import React, { useState, useEffect } from 'react';

const EditForm = ({handleUpdate,todo})=> {
    const [editValue, setEditValue] = useState('');
    const [editDescValue, setEditDescValue] = useState('');

    useEffect(()=> {
        if(todo){
            setEditValue(todo.title);
            setEditDescValue(todo.desc);
        }
    },[todo]);

    const handleOnChange = (e)=> {
        setEditValue(e.target.value);
    }

    const handleSumbitEdit = () => {
        if(todo._id) {
            handleUpdate(todo._id, editValue, editDescValue);
            setEditValue('');
            setEditDescValue('');
        }
    }

    return (
        <div>
            <input
                id="edit-title-field"
                value={editValue}
                onChange={handleOnChange}
            />
            <input
                id="edit-desc-field" 
                value={editDescValue}   
                onChange = {(e) => setEditDescValue(e.target.value)}
            />
            <button
                id ="update-btn"
                onClick={() => handleSumbitEdit()}
            >
            update
            </button>           
        </div>
    )
}

export default EditForm;