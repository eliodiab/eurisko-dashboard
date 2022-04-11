import actionTypes from "../actions/actionTypes";
import arcticlesInitialState from "./articlesInitalState";

const articlesReducer = (state = arcticlesInitialState, action) => {
    switch (action.type){
        case actionTypes.ARTICLES_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case actionTypes.SET_ARTICLES_ERROR_MESSAGE:
            return{
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        case actionTypes.SET_ARTICLES:
            return{
                ...state,
                isLoading: false,
                articles: [...state.articles,...action.payload],
                hasMore: true,
                pageNumber: state.pageNumber + 1,
            }
        case actionTypes.SET_HAS_MORE:
            return{
                ...state,
                hasMore: action.payload,
                isLoading: false,
            }
        case actionTypes.SET_FILTERED_ARTICLES:
            return{
                ...state,
                isLoading:false,
                filteredArticles: action.payload,
            }
        default:
            return state;
    }
}

export default articlesReducer;