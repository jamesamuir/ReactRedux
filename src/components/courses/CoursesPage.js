import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {loadCourses, deleteCourse} from "../../redux/actions/courseActions";
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify";

const CoursesPage = ({authors, loadCourses, loadAuthors, deleteCourse, ...props}) => {

    const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(props.redirectToAddCoursePage);
    const [courses, setCourses] = useState([...props.courses]);
    const [loading, setLoading] = useState(props.loading);

    useEffect(() => {
        if (props.courses.length === 0 ){
            loadCourses().catch(error => {
                alert("Loading courses failed: " + error);
            });
        } else {
            setCourses([...props.courses]);
        }

        if (authors.length === 0){
            loadAuthors().catch(error => {
                alert("Loading authors failed: " + error);
            });
        }

    }, [props.courses]);

    useEffect(() => {
        setLoading(props.loading)
    }, [props.loading]);

    useEffect(() => {
        setRedirectToAddCoursePage(props.redirectToAddCoursePage);
    }, [props.redirectToAddCoursePage]);



   function handleDeleteCourse(course) {
        toast.success("Course was deleted.");
        deleteCourse(course).catch(error => {
            toast.error("Delete failed. " + error.message, {autoClose: false});
        });
    }



    return (
        <>
            {redirectToAddCoursePage === true && <Redirect to={"/course"}/>}
            <h2>Courses</h2>
            {loading === true ? <Spinner/> : (
                <>
                    <button
                        style={{ marginBottom: 20 }}
                        className="btn btn-primary add-course"
                        onClick={() => setRedirectToAddCoursePage(true)}
                    >
                        Add Course
                    </button>
                    {
                        courses.length > 0 &&
                        <CourseList courses={courses} onDeleteClick={handleDeleteCourse}/>
                    }
                    {
                        courses.length === 0 &&
                        <h3 className="alert alert-danger">No courses are available.</h3>
                    }
                </>
            )}

        </>
    );

}

function mapStateToProps(state) {
    return {
        courses: state.courses,
           /* state.authors.length === 0
                ? []
                : state.courses.map(course => {
                    return {
                        ...course,
                        authorName: state.authors.find(a => a.id === course.authorId).name
                    };
                }),*/
        authors: state.authors,
        loading: state.apiCallsInProgress > 0,
        redirectToAddCoursePage: false
    };
}

const mapDispatchToProps = {
        loadCourses,
        loadAuthors,
        deleteCourse
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);