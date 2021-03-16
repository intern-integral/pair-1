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

    })

    describe('#handleDelete', () => {
        it('should delete todo when invoked', async() => {
            const expectedData = [
                {_id : '2', title : "Task 2", desc : "do the thing that in task 2"},
                {_id : '3', title : "Task 3", desc : "do the thing that in task 3"},
                {_id : '4', title : "Task 4", desc : "do the thing that in task 4"},
                {_id : '5', title : "Task 5", desc : "do the thing that in task 5"},
            ];
            const wrapper = shallow(<TodoPages/>);

            const todoListComponent = wrapper.find('TodoList');
            await todoListComponent.props().handleDelete("1");
            const todoListComponentUpdated = wrapper.find('TodoList');
            const expectedTodos = todoListComponentUpdated.props().todos;

            expect(expectedTodos.length).toBe(4);
            expect(expectedTodos).toEqual(expectedData);
        })
    })
})