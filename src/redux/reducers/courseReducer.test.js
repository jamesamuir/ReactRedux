import courseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";

it("should add courese when passed the CREATE_COURSE_SUCCESS", () => {
    //arrange
   const initalState = [
       {
           title: "A"
       },
       {
           title: "B"
       }
   ];
   const newCourse = {
       title: "C"
   };
   const action = actions.createCourseSuccess(newCourse);

   //act
    const newState = courseReducer(initalState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");

});


it("should update courese when passed the UPDATE_COURSE_SUCCESS", () => {
    //arrange
    const initalState = [
        {
            id: 1,
            title: "A"
        },
        {
            id: 2,
            title: "B"
        },
        {
            id: 3,
            title: "C"
        }
    ];

    const course = {id: 2, title: "New Title"}
    const action = actions.updateCourseSuccess(course);

    //act
    const newState = courseReducer(initalState, action);
    const updatedCourse = newState.find(a => a.id === course.id);
    const untouchedCourse = initalState.find(a => a.id === course.id);

    //assert
    expect(updatedCourse.title).toEqual("New Title");
    expect(untouchedCourse.title).toEqual("B");
    expect(newState.length).toEqual(3);

});