import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadCourses} from '../../redux/actions/courseActions';
import {loadAuthors} from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

function ManageCoursePage({courses, authors, loadAuthors, loadCourses}){

    useEffect(() => {
        loadCourses().catch(error => {
            alert("Loading courses failed: " + error);
        });
        loadAuthors().catch(error => {
            alert("Loading authors failed: " + error);
        });
    }, []);

    return (
        <>
            <h2>Manage Course</h2>
        </>
    );
}

function mapStateToProps(state){
    return {
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: loadCourses,
    loadAuthors: loadAuthors,
}

ManageCoursePage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);