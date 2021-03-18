import React from 'react';
import { shallow, mount } from 'enzyme';
import EditForm from './EditForm'
import { act } from 'react-dom/test-utils';

describe("EditForm", ()=> {
    describe("#render", ()=> {
        it('should render title, desc field for edit and its submit btn' , () => {
            const dummyData = {_id : 1, title : "Task 1", desc : "do the thing that in task 1"};
            const wrapper = mount(<EditForm todo={dummyData}/>);
            
            const titleField = wrapper.find("#edit-title-field");
            const descField = wrapper.find("#edit-desc-field");
            const updateBtn = wrapper.find("#update-btn");

            expect(titleField.exists()).toBeTruthy();
            expect(descField.exists()).toBeTruthy();
            expect(updateBtn.exists()).toBeTruthy();
            
        });

        it('should update todo when update button clicked', async() => {
            const mockHandleUpdate = jest.fn();
            const mockTodo = {
                _id: 1,
                title: 'task 1',
                desc: 'task 1 desc'
            }
            const mockEditTitleEvent = {
                target: {
                    value: "Edited title",
                }
            }
            const mockEditDescEvent = {
                target: {
                    value: "Edited desc",
                }
            }
            const wrapper = mount(<EditForm handleUpdate = { mockHandleUpdate } todo={ mockTodo }/>);

            const updateButtonWrapper = wrapper.find('#update-btn');
            const editTitleField = wrapper.find('#edit-title-field');
            const editDescField = wrapper.find('#edit-desc-field');
            await act(async()=> {
                await editTitleField.simulate('change',mockEditTitleEvent);
                await editDescField.simulate('change', mockEditDescEvent);
                await updateButtonWrapper.simulate('click');
            });

            expect(mockHandleUpdate).toHaveBeenCalledWith(mockTodo._id,"Edited title","Edited desc");
        })

    })
})
