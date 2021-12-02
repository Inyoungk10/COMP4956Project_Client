/**
 * @Author Cameron Wark
 * Authentication page Login
*/
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import '../scss/auth.css';
import { signin, signup } from '../actions/auth.js';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const Login = () => {

    const [isSignup, setIsSignUp] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const textFieldVariant = 'standard';

    const dispatch = useDispatch();
    const history = useHistory();

    // function used to switch a boolean value between true and false to adjust JSX rendered in component.
    const formSwitch = () => {
        setIsSignUp(!isSignup);
    }

    // function that is called when google authentication is successful. User data is then stored in localstorage with dispatch()
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token} });
            history.push('/rooms');
        } catch (error) {
            console.log(error);
        }
    }

    // called when google authentication fails.
    const googleFailure = () => {
        console.log("Google sign-in failed.")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // gather data for backend request.
        const formData = {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        }

        console.log(formData)

        // if-else statement dispatches either signup action or signin action depending on the state of isSignup variable. 
        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    return(
        <div>
            <div id="submissionForm">
            { isSignup ? <h2>Sign up</h2> : <h2>Sign in</h2> }
            <form onSubmit={handleSubmit}>
                { isSignup && (
                    <>
                    <TextField label='First name' variant={textFieldVariant} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <br />
                    
                    <TextField label='Last name' variant={textFieldVariant} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <br />
                    </>
                )}

                <TextField label='Email' variant={textFieldVariant} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />

                <TextField label='Password' variant={textFieldVariant} value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />

                { isSignup && (
                    <>
                    <TextField label='Repeat password' value={repeatPassword} variant={textFieldVariant} onChange={(e) => setRepeatPassword(e.target.value)} required/>
                    <br />
                    </>
                )}
                <Button variant='contained' type='submit'>
                    { isSignup ? 'Sign up' : 'Sign in' }
                </Button>
                <br />
                <GoogleLogin 
                    clientId="432327020955-d7cffq2keh3f41tmo5negie5adkeqp5c.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
            </form>
            { isSignup ? <><span>Already have an account? </span><a className='formSwitch' onClick={formSwitch}>Sign in</a></>
                : <><a>Forgot password?</a><br /><span>Don't have an account? </span><a className='formSwitch' onClick={formSwitch}>Sign up</a></> }
        </div>
        </div>
    )
}

export default Login;
