import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";


import { getToken } from '../../reducers/thunks';
import { VALIDATOR_REQUIRE } from '../../util/util';
import { useForm } from '../../shared/hooks/form-hook';

import actions from '../../actions/actions';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoginHeader from '../components/LoginHeader';
import "./Login.scss";

const Login = () => {

    const dispatch = useDispatch();

    const {isLoading,errorMessage} = useSelector(state => state.login);

    const localToken = JSON.parse(localStorage.getItem('userToken')); 

    const token = useSelector(state => state.login).token || (localToken != null && localToken.token);
    
    const color = '#FFF';

    const [formState, inputHandler] = useForm(
        {
            username:{
                value: '',
                isValid: false
            },
            password:{
                value: '',
                isValid:false
            }
        },
        false
    );

    let credentials = {
        username:formState.inputs.username.value,
        password:formState.inputs.password.value
    }

    let handleSubmit = (event) => {
        event.preventDefault(); 
        dispatch(actions.loginLoading())
        dispatch(getToken(credentials))
    }
    
    if(token && new Date(localToken.expiration) > new Date()){
        return <Redirect to="/dashboard" />
    }
    
    return(
        <>
            <LoginHeader />
            <div className='loginContainer'>
                <h2> Log in to your account </h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        element="input" 
                        type="text" 
                        label="Username" 
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid username."
                    />
                    <Input
                        id="password"
                        element="input" 
                        type="password" 
                        label="Password" 
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid username password."
                    />
                    {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
                    <Button type="submit" disabled={!formState.isValid || isLoading}>
                        {isLoading ? <ClipLoader color={color} loading={isLoading} size={10}/> : 'LOGIN'}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Login;