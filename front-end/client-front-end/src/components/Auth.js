import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import '../scss/auth.css';

const Login = () => {

    const [isSignup, setIsSignUp] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const formSwitch = () => {
        setIsSignUp(!isSignup);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: {result, token} });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google sign-in failed.")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        }

        if (isSignup) {

        } else {

        }
    }

    return(
        <div>
            <div id="submissionForm">
            { isSignup ? <h2>Sign up</h2> : <h2>Sign in</h2> }
            <form onSubmit={handleSubmit}>
                { isSignup && (
                    <>
                    <label>First name</label>
                    <br />
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></input>
                    <br />
                    <label>Last name</label>
                    <br />
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    ></input>
                    <br />
                    </>
                )}
                <label>Email</label>
                <br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
                <br />
                <label>Password</label>
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                <br />
                { isSignup && (
                    <>
                    <label>Repeat password</label>
                    <br />
                    <input
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    ></input>
                    <br />
                    </>
                )}
                <button type='submit'>
                    { isSignup ? 'Sign up' : 'Sign in' }
                </button>
                <br />
                <GoogleLogin 
                    clientId="432327020955-d7cffq2keh3f41tmo5negie5adkeqp5c.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
            </form>
            { isSignup ? <><span>Already have an account? </span><a onClick={formSwitch}>Sign in</a></>
                : <><a>Forgot password?</a><br /><span>Don't have an account? </span><a onClick={formSwitch}>Sign up</a></> }
        </div>
        </div>
    )
}

export default Login;
