import React, { useState, useEffect } from 'react';

const EditForm = ({handleUpdate,todo})=> {
    const [editValue, setEditValue] = useState('');
    const [editDescValue, setEditDescValue] = useState('');

    function setupField() {
        setEditValue(todo.title);
        setEditDescValue(todo.desc);
    }

    useEffect(()=> {
        setupField();
    },[]);

    const handleOnChange = (e)=> {
        setEditValue(e.target.value);
    }

    const handleSumbitEdit = () => {
        handleUpdate(todo._id, editValue, editDescValue);
        setEditValue('');
        setEditDescValue('');
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