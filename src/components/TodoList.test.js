import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoList from './TodoList';

const dummyData = [
    {_id : '1', title : "Task 1", desc : "do the thing that in task 1"},
    {_id : '2', title : "Task 2", desc : "do the thing that in task 2"},
    {_id : '3', title : "Task 3", desc : "do the thing that in task 3"},
    {_id : '4', title : "Task 4", desc : "do the thing that in task 4"},
    {_id : '5', title : "Task 5", desc : "do the thing that in task 5"},
]


describe("TodoList", () => {
    describe("#render", () => {
        it('should render TodoList correctly', () => {
            const wrapper = shallow(<TodoList/>);

            const actualComponents = wrapper.find('.todo-list');
            
            expect(actualComponents).toHaveLength(1);
        });
        it('should have delete button', () => {
            const wrapper = shallow(<TodoList todos={ dummyData }/>);

            const actualButtons = wrapper.find('.del-btn');

            expect(actualButtons).toHaveLength(5);
        });

        it('should remove todo when delete button clicked', () => {
            const mockHandleDelete = jest.fn();
            const wrapper = shallow(<TodoList todos= { dummyData } handleDelete= { mockHandleDelete }/>);

            const actualButtons = wrapper.find('.del-btn');
            actualButtons.at(0).simulate('click');

            expect(mockHandleDelete).toHaveBeenCalled();
            expect(mockHandleDelete).toHaveBeenCalledWith("1");
        })

    })
})