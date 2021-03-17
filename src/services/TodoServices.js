import axios from 'axios';

const URL = 'http://localhost:4000/api/todos';

export const fetchTodos = async () => {
    const res = await axios.get(URL);
    return res.data.data;
}