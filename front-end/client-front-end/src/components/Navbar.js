/**
 * Author: Inyoung Kang, Cameron Wark
 * Revision Date: 11/18/2021
 * Summary: Navbar displayed on all pages
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
            <Button color="inherit" component={Link} to="/rooms">Home</Button>

            { user ? (
                <>
                <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/rooms">Home</Button>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Roomity(?) Name pending
                        </Typography>
                    
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
                </Box>
                </>
            ) : (
                <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                </>
            ) }            
        </div>
    )
}

export default Navbar;
