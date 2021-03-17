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

    })
})
