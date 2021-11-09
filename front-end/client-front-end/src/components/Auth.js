import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
// import { GoogleLogin } from 'react-google-login';

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
            { isSignup ? <h2>Sign up</h2> : <h2>Sign in</h2> }
            <form onSubmit={handleSubmit}>
                { isSignup && (
                    <>
                    <label>First name</label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    ></input>
                    <label>Last name</label>
                    <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    ></input>
                    </>
                )}
                <label>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>
                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
                { isSignup && (
                    <>
                    <label>Repeat password</label>
                    <input
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    ></input>
                    </>
                )}
                <button type='submit'>
                    { isSignup ? 'Sign up' : 'Sign in' }
                </button>
            </form>
            { isSignup? <><span>Already have an account? </span><a onClick={formSwitch}>Sign in</a></>
                : <><a>Forgot password?</a><span>Don't have an account? </span><a onClick={formSwitch}>Sign up</a></> }
        </div>
    )
}

export default Login;

// const responseGoogle = response => {
//     console.log(response);

//     return (
//         <GoogleLogin
//         clientId=""
//         buttonText="Login with Google"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy="single_host_origin"
//         />
//     )
// }

// export default responseGoogle;

