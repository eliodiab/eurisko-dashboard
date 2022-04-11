import actionTypes from "./actionTypes";

const loginLoading = () => (
    {
        type: actionTypes.LOGIN_LOADING
    }
)

const articlesLoading = () => (
    {
        type: actionTypes.ARTICLES_LOADING
    }
)
const setToken = (token) => (
    {
        type: actionTypes.SET_TOKEN,
        payload:token
    }
)

const deleteToken = () => (
    {
        type: actionTypes.DELETE_TOKEN,
    }
)

const setLoginErrorMessage = ( message ) => (
    {
        type: actionTypes.SET_LOGIN_ERROR_MESSAGE,
        payload: message
    }
)
const setArticlesErrorMessage = ( message ) => (
    {
        type: actionTypes.SET_ARTICLES_ERROR_MESSAGE,
        payload: message
    }
)

const setArticles = (articles) => (
    {
        type: actionTypes.SET_ARTICLES,
        payload: articles
    }
)

const setHasMore = (hasMore) => (
    {
        type: actionTypes.SET_HAS_MORE,
        payload: hasMore
    }
)

const setFilteredArticles = (articles) => (
    {
        type: actionTypes.SET_FILTERED_ARTICLES,
        payload: articles
    }

)

const actions = {
    loginLoading,
    articlesLoading,
    setLoginErrorMessage,
    setArticlesErrorMessage,
    setToken,
    deleteToken,
    setArticles,
    setHasMore,
    setFilteredArticles
}

export default actions;