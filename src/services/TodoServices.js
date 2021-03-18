import axios from 'axios';

const URL = 'http://localhost:4000/api/todos';

export const fetchTodos = async () => {
    const response = await axios.get(URL);
    return response.data.data;
}

export const postTodo = async(title, desc) => {
    const newTodo = {
        title,
        desc
    }
    const response = await axios.post(URL, newTodo);
    return response.data;
}

export const editTodo = async(id, title, desc)=> {
    const editTodo = {
        _id : id,
        title,
        desc
    }
    const response = await axios.patch(`${URL}/${id}`, editTodo)
    return response.data;
}