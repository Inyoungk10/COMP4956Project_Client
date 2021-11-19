/**
 * Author:
 * Revision Date:
 * Summary: 
*/
import * as React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Button color="inherit" component={Link} to="/rooms">Home</Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Roomity(?) Name pending
            </Typography>
          
            <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}