import actions from "../actions/actions";
import api from "../helper/api";

export const getToken = (cred) => (dispatch) => {
    const json = JSON.stringify(cred);
    api().post(`/auth/signin`, json)
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

export const getArticles = (nextPageNumber) => (dispatch) => {
  api().get(`/articles?page=${nextPageNumber}`)
  .then((response) => {
      const numberOfArticles = response.data.response.docs.length;
      dispatch(actions.setArticles(response.data.response.docs))
      if(numberOfArticles < 10){
        dispatch(actions.setHasMore(false));
      }
  })
  .catch((error) => {
    dispatch(actions.setArticlesErrorMessage("Something wrong happened while fetching articles."));
  })
}
