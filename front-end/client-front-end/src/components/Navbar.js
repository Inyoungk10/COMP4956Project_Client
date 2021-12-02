/**
 * @Author Inyoung Kang, Cameron Wark
 * Revision Date: 11/18/2021
 * Summary: Navbar displayed on all pages
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import '../css/Navbar.css';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import 'materialize-css/dist/css/materialize.min.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
                            <li><a component={Link} to="/rooms">Dashboard</a></li>
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
                            <li><a component={Link} to="/">Home</a></li>
                            <li><a component={Link} to="/login">Login</a></li>
                        </ul>
                    </div>
                </nav>
                
                </>
            ) }            
        </div>
    )
}

export default Navbar;
