import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const Navbar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // 'profile' key-value set in auth.js reducer
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    return(
        <div>
            <Link to='/'>Home</Link>

            { user ? (
                <>
                <Link to='/room_page'>Rooms</Link>
                <Link to='/sandbox'>Sandbox</Link>
                <Link to='/addbox'>Create Box</Link>
                <Link to='/boxes'>Boxes</Link>
                <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                <Link to='/login'>Sign in</Link>
                </>
            ) }            
        </div>
    )
}

export default Navbar;
