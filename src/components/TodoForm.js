import React, { useState, useEffect } from 'react';

const TodoForm = ({handleSubmit})=> { 

    const [value, setValue] = useState('');
    const [descValue, setDescValue] = useState('');

    const handleOnChange = (e)=> {
        setValue(e.target.value);
    }

    const submitFunc = () => {
        handleSubmit(value, descValue);
        setValue(''); 
        setDescValue(''); 
    }

    return(
        <div className="todo-form">
            <input
                id="input-title-field"
                value={value}
                onChange={handleOnChange}
            />
            <input
                id="input-desc-field" 
                value={descValue}   
                onChange = {(e) => setDescValue(e.target.value)}
            />
            <button
                id ="submit-btn"
                onClick={() => submitFunc()}
            >
            add
            </button>
        </div>
    )
}

export default TodoForm;