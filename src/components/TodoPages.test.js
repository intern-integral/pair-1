import React from "react";
import { shallow, mount } from 'enzyme';
import TodoPages from './TodoPages';
describe('TodoPages', () => {
    describe('#render', () => {
        it('should render TodoPages correctly', () => {
            const wrapper = shallow(<TodoPages/>);

            const actualComponents = wrapper.find('.todo-pages');

            expect(actualComponents).toHaveLength(1);
        });

        it('should render list of task', () => {
            const wrapper  = mount(<TodoPages/>);

            const actualTasks = wrapper.find('.task');

            expect(actualTasks).toHaveLength(5);
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
            const expectedData = [
                {_id : 1, title : "Task 1", desc : "do the thing that in task 1"},
                {_id : 2, title : "Task 2", desc : "do the thing that in task 2"},
                {_id : 3, title : "Task 3", desc : "do the thing that in task 3"},
                {_id : 4, title : "Task 4", desc : "do the thing that in task 4"},
                {_id : 5, title : "Task 5", desc : "do the thing that in task 5"},
                {_id : 6, title : "Task 6", desc : "do the thing that in task 6"},
            ];
            const wrapper = shallow(<TodoPages/>);

            const todoFormComponent = wrapper.find('TodoForm');
            await todoFormComponent.props().handleSubmit("Task 6", "do the thing that in task 6");
            const todoListComponent = wrapper.find('TodoList');

            expect(todoListComponent.props().todos.length).toBe(6);
            expect(todoListComponent.props().todos).toEqual(expectedData);

        })
    });
})