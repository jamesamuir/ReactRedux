import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import AuthorsList from "./AuthorsList";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify";
import {loadAuthors} from "../../redux/actions/authorActions";

function AuthorsPage(props) {

    const [authors, setAuthors] = useState([...props.authors]);
    const [loading, setLoading] = useState(props.loading);
    const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);

    useEffect(() => {
        if (props.authors.length === 0 ){
            props.loadAuthors().catch(error => {
                alert("Loading authors failed: " + error);
            });
        } else {
            setAuthors([...props.authors]);
        }
    }, [props.authors]);

    return (
        <>
            {redirectToAddAuthorPage && <Redirect to={"/author"}/>}
            <h2>Authors</h2>
            {loading === true ? <Spinner/> : (
                <>
                    <button
                        style={{ marginBottom: 20 }}
                        className="btn btn-primary add-course"
                        onClick={() => setRedirectToAddAuthorPage(true )}
                    >
                        Add Author
                    </button>
                    <AuthorsList authors={authors} />
                </>
            )}

        </>
    );
}

function mapStateToProps(state){
    return {
        authors: state.authors,
        loading: state.apiCallsInProgress.length > 0
    }
}
const mapDispatchToProps = {
    loadAuthors: loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
