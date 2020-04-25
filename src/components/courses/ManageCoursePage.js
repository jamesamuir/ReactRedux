import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadCourses, saveCourse} from '../../redux/actions/courseActions';
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";


function ManageCoursePage({courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props}){


    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});


    useEffect(() => {
        loadCourses().catch(error => {
            alert("Loading courses failed: " + error);
        });
        loadAuthors().catch(error => {
            alert("Loading authors failed: " + error);
        });
    }, []);

    function handleChange(event){
        const {name, value} = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10): value
        }));
    }

    function handleSave(event){
        event.preventDefault();
        saveCourse(course).then(() => {
            history.push("/courses");
        })
    }


    return (
        <CourseForm authors={authors} course={course} errors={errors} onChange={handleChange} onSave={handleSave}/>
    );
}

export function getCourseBySlug(courses, slug){
    return courses.find(course => course.slug === slug);
}

function mapStateToProps(state, ownProps){
    const slug = ownProps.match.params.slug;
    const course = slug && state.courses.length > 0? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course: course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: loadCourses,
    loadAuthors: loadAuthors,
    saveCourse: saveCourse
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);