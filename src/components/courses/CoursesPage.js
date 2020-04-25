import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {

    state = {
        redirectToAddCoursePage: false
    };

    componentDidMount() {
        this.props.actions.loadCourses().catch(error => {
            alert("Loading courses failed: " + error);
        })
    }


    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to={"/course"}/>}
                <h2>Courses</h2>
                <button
                    style={{ marginBottom: 20 }}
                    className="btn btn-primary add-course"
                    onClick={() => this.setState({ redirectToAddCoursePage: true })}
                >
                    Add Course
                </button>
                <CourseList courses={this.props.courses}/>
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);