import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoServices, { fetchTodos, postTodo, editTodo, deleteTodo } from './TodoServices'
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('axios',()=> ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn()
}))

describe('TodoServices', ()=> {
    describe('#fetchTodos', ()=> {
        afterEach(()=> {
            jest.resetAllMocks();
        })
        it('should fetch all data when called', async()=> {
            const expectedValue = {
                data: {
                    data: [
                        {_id : "6051c471c355991e8c259e94", title : "Task 1", desc : "do the thing that in task 1"},
                        {_id : "6051c471c355991e8c259e93", title : "Task 2", desc : "do the thing that in task 2"},
                        {_id : '6051c471c355991e8c259e92', title : "Task 3", desc : "do the thing that in task 3"},
                        {_id : '6051c471c355991e8c259e91', title : "Task 4", desc : "do the thing that in task 4"},
                        {_id : '6051c471c355991e8c259e90', title : "Task 5", desc : "do the thing that in task 5"}
                    ]
                }
            };
            jest.spyOn(axios, 'get').mockReturnValue(expectedValue);

            const fetchedData = await fetchTodos();
            await Promise.resolve();

            expect(fetchedData).toEqual(expectedValue.data.data);
        })

        it('should fetch all data when called using mock', async()=> {
            const expectedValue = {
                data: {
                    data: [
                        {_id : "6051c471c355991e8c259e94", title : "Task 1", desc : "do the thing that in task 1"},
                        {_id : "6051c471c355991e8c259e93", title : "Task 2", desc : "do the thing that in task 2"},
                        {_id : '6051c471c355991e8c259e92', title : "Task 3", desc : "do the thing that in task 3"},
                        {_id : '6051c471c355991e8c259e91', title : "Task 4", desc : "do the thing that in task 4"},
                        {_id : '6051c471c355991e8c259e90', title : "Task 5", desc : "do the thing that in task 5"}
                    ]
                }
            };
            axios.get.mockReturnValue(expectedValue);
            const expectedURL = 'http://localhost:4000/api/todos';

            const fetchedData = await fetchTodos();
            
            expect(fetchedData).toEqual(expectedValue.data.data);
            expect(axios.get).toHaveBeenCalledWith(expectedURL);
        })
    })
    describe('#postTodo', ()=> {
        it('should post data when called', async()=> {
            const expectedValue = {
                title : "watching tv", 
                desc : "watch full series"                    
            };
            axios.post.mockReturnValue(expectedValue);
            const expectedURL = 'http://localhost:4000/api/todos';

            const postData = await postTodo(expectedValue.title,expectedValue.desc);

            expect(postData).toEqual(expectedValue.data);
            expect(axios.post).toHaveBeenCalledWith(expectedURL,expectedValue);
        })
    })

    describe('#editTodo', ()=> {
        it('should edit data when called', async()=> {
            const expectedValue = {
                _id: '112233',
                title : 'watching tv', 
                desc : 'watch full series'                    
            };
            axios.patch.mockReturnValue(expectedValue);
            const expectedURL = `http://localhost:4000/api/todos/${expectedValue._id}`;

            await editTodo(expectedValue._id,expectedValue.title,expectedValue.desc);

            expect(axios.patch).toHaveBeenCalledWith(expectedURL,expectedValue);
        })
    })

    describe('#deleteTodo', ()=> {
        it('should delete data when called', async()=> {
            const expectedValue = {
                _id: '112233',
                title : 'watching tv', 
                desc : 'watch full series'                    
            };
            axios.delete.mockReturnValue(expectedValue);
            const expectedURL = `http://localhost:4000/api/todos/${expectedValue._id}`;
    
            await deleteTodo(expectedValue._id);
    
            expect(axios.delete).toHaveBeenCalledWith(expectedURL);
        })
    })
})