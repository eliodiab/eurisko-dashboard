import axios from "axios";
import actions from "../actions/actions";

const URL = "http://34.245.213.76:3000";


export const getToken = (cred) => (dispatch) => {
    const json = JSON.stringify(cred);
    axios.post(`${URL}/auth/signin`, json, {
      headers: {
        'Content-Type': 'application/json'
      }})
    .then((response) => {
        dispatch(actions.setToken(response.data.accessToken));
        const tokenExpirationDate = new Date(new Date().getTime() + 2000 * 60 * 60); // 2 hours (assuming the token is also valid for 2 hours on the server side otherwise we should change it)
        localStorage.setItem('userToken', JSON.stringify({ // using local storage in case the user refreshes the page 
          token:response.data.accessToken,                 // if we use cookies we will send request to the server each time
          expiration: tokenExpirationDate.toISOString()
        }));
    })
    .catch((error) => {
      dispatch(actions.setLoginErrorMessage("The username and password don't match. Please try again."));
    });
}

export const getArticles = (token, nextPageNumber) => (dispatch) => {
  axios
  .get(`http://34.245.213.76:3000/articles?page=${nextPageNumber}` , {
      headers: {
          "Authorization" : `Bearer ${token}`
      }
  })
  .then((response) => {
      if(response.data.response.docs.length === 0){
        dispatch(actions.setHasMore(false));
        return;
      } 
      dispatch(actions.setArticles(response.data.response.docs));
  })
  .catch((error) => {
    dispatch(actions.setArticlesErrorMessage("Something wrong happened while fetching articles."));
  })
}
