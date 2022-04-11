import { useEffect, useState, useRef, useCallback} from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";

import actions from "../../actions/actions";
import { getArticles } from "../../reducers/thunks";

import Header from "../components/Header";
import ArticlesList from "../components/ArticlesList";

import "./Dashboard.scss"

const Dashboard = () => {

    const dispatch = useDispatch();
    let localToken = JSON.parse(localStorage.getItem('userToken'));
    const token = useSelector(state => state.login).token || (localToken != null && localToken.token);

    const {isLoading, articles, filteredArticles, hasMore, pageNumber, errorMessage} = useSelector(state => state.dashboard);
    const [inputSearch, setInputSearch] = useState("");
    const [color] = useState("#121212");


    //load on scroll implementation using IntersectionObserver
    const observer = useRef();
    const lastArticleElementRef = useCallback(node => { 
        if(isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                dispatch(actions.articlesLoading())
                dispatch(getArticles(token, pageNumber))
            }
        })
        if(node) observer.current.observe(node);
    },[hasMore,isLoading,pageNumber,token,dispatch])

    //logout function
    const handleLogout = () => {
        dispatch(actions.deleteToken());
        localStorage.removeItem('userToken');
    }

    //
    const handleChange = (event) => {
        let searchInput = event.target.value;
        let filteredArray = articles.filter(
            article => article.lead_paragraph.toLowerCase().includes(searchInput.toLowerCase().trim()) 
            || 
            article.headline.main.toLowerCase().includes(searchInput.toLowerCase().trim())); //filter based on lead_paragraph and headline main
        setInputSearch(searchInput);
        if(searchInput === ''){
            dispatch(actions.setFilteredArticles([]));
        }else{
            dispatch(actions.setFilteredArticles(filteredArray));
        }
    }

    // eslint work around
    let esLintgetArticles = useRef(); 
    esLintgetArticles.current = () => {
        dispatch(actions.articlesLoading());
        dispatch(getArticles(token, pageNumber));
    }

    useEffect( () => {
        esLintgetArticles.current(); //fetch articles after loading dashboard page
    },[])

    if(!token || new Date(localToken.expiration) < new Date()){ //if no token in localstorage or in store or token expired redirect to login page
        return <Redirect to="/auth"/>
    }

    return(
        <div className="dashboard">
            <Header inputValue={inputSearch} onChange={handleChange} logout={handleLogout} />
            <ArticlesList inputValue={inputSearch} articles={articles} filteredArticles={filteredArticles} lastArticleElementRef={lastArticleElementRef} isLoading={isLoading}/>
            <div className="spinnerContainer">
                <div>
                    <ClipLoader color={color} loading={isLoading} size={50} />
                </div>
            </div>

            {(((articles.length === 0 ) || (articles.length !== 0 && filteredArticles.length === 0 && inputSearch !== '' )) && isLoading === false && errorMessage === null) &&
                <div className="noResult">
                    No results
                </div>        
            }
            {errorMessage && 
                <div className="errorMessage">
                    {errorMessage}
                </div>
            }
        </div>
    )
}

export default Dashboard;