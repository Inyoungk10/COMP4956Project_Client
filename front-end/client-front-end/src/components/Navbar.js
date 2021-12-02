/**
 * @Author Inyoung Kang, Cameron Wark
 * Revision Date: 11/18/2021
 * Summary: Navbar displayed on all pages
 * 
 * @Author Inyoung Kang, Francis Sapanta
 * Revision Date: 12/01/2021
 * Summary: Fix Navbar bugs
*/
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import '../css/Navbar.css';
import 'materialize-css/dist/css/materialize.min.css';


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
            { user ? (
                <>
                <nav>
                    <div class="nav-wrapper">
                        <a href="/rooms" class="brand-logo">Roomality</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><Link to="/unity">(Kevin's) Spatial Mapping Demo</Link></li>
                            <li><Link to="/rooms">Dashboard</Link></li>
                            <li><a onClick={logout} >Logout</a></li>
                        </ul>
                    </div>
                </nav>
                </>
            ) : (
                <>
                <nav>
                    <div class="nav-wrapper">
                        <a href="#" class="brand-logo">Roomality</a>
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            {/* <li><a component={Link} to="/">Home</a></li>
                            <li><a component={Link} to="/login">Login</a></li> */}
                        </ul>
                    </div>
                </nav>
                
                </>
            ) }            
        </div>
    )
}

export default Navbar;
