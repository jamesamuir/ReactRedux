import React from 'react';
import CourseForm from "./CourseForm";
import renderer from 'react-test-renderer';
import {courses, authors} from "../../../tools/mockData";

it ("set submit button label to 'Saving' when saving is true", () => {
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            onChange={jest.fn()}
            authors={authors}
            onSave={jest.fn()}
            saving
        />
    );

    expect(tree).toMatchSnapshot();
});


it ("set submit button label to 'Save' when saving is false", () => {
    const tree = renderer.create(
        <CourseForm
            course={courses[0]}
            onChange={jest.fn()}
            authors={authors}
            onSave={jest.fn()}
            saving={false}
        />
    );

    expect(tree).toMatchSnapshot();
});