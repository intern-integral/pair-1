import React, { useState, useEffect } from 'react';

const TodoForm = ({handleSubmit, handleUpdate, todo})=> { 
    const [value, setValue] = useState('');
    const [descValue, setDescValue] = useState('');
    // const [editValue, setEditValue] = useState('');
    // const [editDescValue, setEditDescValue] = useState('');

    const handleOnChange = (e)=> {
        setValue(e.target.value);
    }

    const submitFunc = () => {
        handleSubmit(value, descValue);
        setValue(''); 
        setDescValue(''); 
    }

    // const handleSumbitEdit = () => {
    //     if(todo._id) {
    //         handleUpdate(todo._id, editValue, editDescValue);
    //         setEditValue('');
    //         setEditDescValue('');
    //     }
    // }

    return(
        <div className="todo-form">
            <div>
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
            { // should have make a new edit form component
                // todo._id ? 
                // <div>
                //     <input
                //         id="edit-title-field"
                //         value={editValue}
                //         onChange={(e) => setEditValue(e.target.value)}
                //     />
                //     <input
                //         id="edit-desc-field" 
                //         value={editDescValue}   
                //         onChange = {(e) => setEditDescValue(e.target.value)}
                //     />
                //     <button
                //         id ="update-btn"
                //         onClick={handleSumbitEdit}
                //     >
                //     update
                //     </button>
                // </div> : <> </>
            }
        </div>
    )
}

export default TodoForm;