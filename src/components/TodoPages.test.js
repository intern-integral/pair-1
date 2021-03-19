import React from "react";
import { shallow, mount } from 'enzyme';
import TodoPages from './TodoPages';
import { act } from "@testing-library/react";
import { fetchTodos, postTodo, editTodo } from '../services/TodoServices'
import EditForm from "./EditForm";

jest.mock('../services/TodoServices', ()=> ({
    fetchTodos: jest.fn(),
    postTodo: jest.fn(),
    editTodo: jest.fn()
}))

const dummyData = [
    {_id : "6051c471c355991e8c259e94", title : "Task 1", desc : "do the thing that in task 1"},
    {_id : "6051c471c355991e8c259e93", title : "Task 2", desc : "do the thing that in task 2"},
    {_id : '6051c471c355991e8c259e92', title : "Task 3", desc : "do the thing that in task 3"},
    {_id : '6051c471c355991e8c259e91', title : "Task 4", desc : "do the thing that in task 4"},
    {_id : '6051c471c355991e8c259e90', title : "Task 5", desc : "do the thing that in task 5"},
];

describe('TodoPages', () => {
    afterEach(()=> {
        jest.resetAllMocks();
    })
    describe('#render', () => {
        it('should render TodoPages correctly', () => {
            const wrapper = shallow(<TodoPages/>);

            process.nextTick(() => {
                wrapper.update();
                const actualComponents = wrapper.find('.todo-pages');
                expect(actualComponents).toHaveLength(1);
            }, 0)
        });

        it('should render list of task', () => {
            fetchTodos.mockResolvedValue(dummyData);
            const wrapper  = mount(<TodoPages/>);

            process.nextTick(async () => {
                wrapper.update();
                const actualTasks = wrapper.find('.task');
                expect(actualTasks).toHaveLength(dummyData.length);
            }, 0)
        });

        it('should render button and input field element', ()=> {
            const wrapper = shallow(<TodoPages/>);
            
            const buttonElement = wrapper.find('#submit-btn');
            const inputElement = wrapper.find('#nput-title-field');
            const descField = wrapper.find("#input-desc-field");

            expect(buttonElement.exists()).toBeTruthy();
            expect(inputElement.exists()).toBeTruthy();
            expect(descField.exists()).toBeTruthy();
        })
    })

    describe('#handleDelete', () => {
        it('should delete todo when invoked', async() => {
            const expectedData = [
                {_id : 2, title : "Task 2", desc : "do the thing that in task 2"},
                {_id : 3, title : "Task 3", desc : "do the thing that in task 3"},
                {_id : 4, title : "Task 4", desc : "do the thing that in task 4"},
                {_id : 5, title : "Task 5", desc : "do the thing that in task 5"},
            ];
            const wrapper = shallow(<TodoPages/>);

            const todoListComponent = wrapper.find('TodoList');
            await todoListComponent.props().handleDelete(1);
            const todoListComponentUpdated = wrapper.find('TodoList');
            const expectedTodos = todoListComponentUpdated.props().todos;

            expect(expectedTodos.length).toBe(4);
            expect(expectedTodos).toEqual(expectedData);
        })
    })

    describe('#handleSubmit', () => {
        it('should add todo when handleSubmit invoked', async() => {
            fetchTodos.mockResolvedValue([
                {_id : '6051c471c355991e8c259e94', title : "Task 1", desc : "do the thing that in task 1"},
                {_id : '6051c471c355991e8c259e93', title : "Task 2", desc : "do the thing that in task 2"},
                {_id : '6051c471c355991e8c259e92', title : "Task 3", desc : "do the thing that in task 3"},
                {_id : '6051c471c355991e8c259e91', title : "Task 4", desc : "do the thing that in task 4"},
                {_id : '6051c471c355991e8c259e90', title : "Task 5", desc : "do the thing that in task 5"}
            ])
            const dummyData = {_id : "6051c471c355991e8c259eKK", title : "Task 8", desc : "ASDJASJDLKASJDLKSA"}
            postTodo.mockResolvedValue(dummyData);  
            const wrapper = mount(<TodoPages/>);
            await act(async()=> {
                await (new Promise(resolve => setTimeout(resolve, 0)));
                await wrapper.update();
            })

            await act(async() => {
                const todoFormComponent = wrapper.find('TodoForm');
                await todoFormComponent.props().handleSubmit(dummyData.title, dummyData.desc);
                await (new Promise(resolve => setTimeout(resolve, 0)));
                await wrapper.update();
            }) 
            const todoListComponent = wrapper.find('TodoList');
 
            expect(todoListComponent.props().todos).toContain(dummyData);
            expect(todoListComponent.props().todos.length).toBe(6);
            expect(postTodo).toHaveBeenCalledWith(dummyData.title, dummyData.desc);
        })
    });

    describe('#handleEdit', () => {
        it('should edit data when handleEdit is invoked', async()=> {
            fetchTodos.mockResolvedValue([
                {_id : '6051c471c355991e8c259e94', title : "Task 1", desc : "do the thing that in task 1"},
                {_id : '6051c471c355991e8c259e93', title : "Task 2", desc : "do the thing that in task 2"},
                {_id : '6051c471c355991e8c259e92', title : "Task 3", desc : "do the thing that in task 3"},
                {_id : '6051c471c355991e8c259e91', title : "Task 4", desc : "do the thing that in task 4"},
                {_id : '6051c471c355991e8c259eKK', title : "Task 5", desc : "do the thing that in task 5"}
            ])
            const dummyData = {_id : "6051c471c355991e8c259eKK", title : "Task 8", desc : "ASDJASJDLKASJDLKSA"}
            editTodo.mockResolvedValue(dummyData);
            const wrapper = mount(<TodoPages />);
            await act(async()=> {
                await (new Promise(resolve => setTimeout(resolve, 0)));
                await wrapper.update();
            })

            await act(async()=> {
                const todoListComponent = wrapper.find('TodoList');
                await todoListComponent.props().handleEdit(dummyData._id);
                await (new Promise(resolve => setTimeout(resolve, 0)));
                await wrapper.update();
                const editFormComponent = wrapper.find('EditForm');
                await editFormComponent.props().handleUpdate(dummyData._id, dummyData.title, dummyData.desc);
                await (new Promise(resolve => setTimeout(resolve, 0)));
                await wrapper.update();
            });            

            expect(editTodo).toHaveBeenCalledWith(dummyData._id, dummyData.title, dummyData.desc);

        })
    });

    describe('#fetch', () => {
        it('should fetch data when page is loaded' , async () => {
            const expectedData = [
                {_id : "6051c471c355991e8c259e94", title : "Task 1", desc : "do the thing that in task 1"},
                {_id : "6051c471c355991e8c259e93", title : "Task 2", desc : "do the thing that in task 2"},
                {_id : '6051c471c355991e8c259e92', title : "Task 3", desc : "do the thing that in task 3"},
                {_id : '6051c471c355991e8c259e91', title : "Task 4", desc : "do the thing that in task 4"},
                {_id : '6051c471c355991e8c259e90', title : "Task 5", desc : "do the thing that in task 5"},
            ]
            fetchTodos.mockResolvedValue(expectedData);
            
            let mountComponent;
            await act(async()=> {
                mountComponent = await mount(<TodoPages />);
            })
            mountComponent.update();
            const todoListComponent = mountComponent.find('TodoList');

            expect(todoListComponent.props().todos).toEqual(expectedData);
        }); 
    }) 
})