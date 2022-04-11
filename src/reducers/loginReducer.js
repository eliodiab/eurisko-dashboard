import actionTypes from "../actions/actionTypes";
import loginInitialState from "./loginInitialState";


const loginReducer = (state = loginInitialState, action) => {
    switch (action.type){
        case actionTypes.LOGIN_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case actionTypes.SET_LOGIN_ERROR_MESSAGE:
            return{
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        case actionTypes.SET_TOKEN:
            return{
                ...state,
                token: action.payload,
                isLoading: false,
                errorMessage :null,
            }
        case actionTypes.DELETE_TOKEN:
            return{
                ...state,
                token: null,
                isLoading: false,
                errorMessage: null,
            }
        default:
            return state;
    }
}

export default loginReducer;