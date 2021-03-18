import React from 'react';
import { shallow, mount } from 'enzyme';
import TodoForm from './TodoForm'
import { act } from 'react-dom/test-utils';

describe("TodoForm",() => {
    describe("#render", () => {
        it('should add todo when add button clicked', async()=> {
            const mockHandleSubmit = jest.fn();
            const mockTitleEvent = {
                target: {
                    value: "Task 6",
                }
            }
            const mockDescEvent = {
                target: {
                    value: "do the thing that in task 6",
                }
            }
            const wrapper = mount(<TodoForm handleSubmit = { mockHandleSubmit }/>); 
            
            const submitButtonWrapper = wrapper.find('#submit-btn');
            const titleField = wrapper.find('#input-title-field');
            const descField = wrapper.find("#input-desc-field");
            await act(async() => {
                await titleField.simulate('change',mockTitleEvent);
                await descField.simulate('change',mockDescEvent);
                await submitButtonWrapper.simulate('click');
            })

            expect(mockHandleSubmit).toHaveBeenCalledWith("Task 6", "do the thing that in task 6");
            
        })        
    })
})