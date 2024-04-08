/*
Ta Thanh Khuong: 103526664
*/
import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
} from '@mui/material';
import logo from '../images/bit-logo.png'
const commonTab = {
    marginLeft: '20px',
    marginRight: '20px',
    fontSize: "1.2em",
    color: "black",

    "&:hover": {
        fontWeight: 600
    },
}

const highlightTab = {
    background: "#023020",
    color: "white",
    fontWeight: "600",
    borderRadius: "20px",
    paddingRight: "1rem",
    paddingLeft: "1rem",
}

export const Navbar2 = ({isLoggedIn, setLoggedIn }) => {
    const navigate = useNavigate()
    const handleLogout = () =>{
        setLoggedIn(false)
        navigate('/login')// auto redirect to login page when click on logout 
    }
    return (
        <AppBar
            style={{
                color: 'black',
                padding: '1rem',
                background: '#9AACA6',
            }}
        >
            <Toolbar>
                <img src={logo} alt="Logo"
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid black',
                        backgroundColor: 'white',
                    }}
                >
                </img>
                <Tabs sx={{ marginLeft: 'auto' }}>
                    <Link to="/"><Tab label="Home" sx={commonTab}></Tab></Link>
                   
                    {isLoggedIn ? (
                        <>
                            <Link to='/audit-system'><Tab label="Audit System" sx={commonTab}></Tab></Link>
                            <Link to='/report-history'><Tab label="Report History" sx={commonTab}></Tab></Link>
                            <Link to='/account'><Tab label="Account" sx={commonTab}></Tab></Link>
                            <Tab label="Logout" sx={commonTab}  style={highlightTab} onClick={handleLogout}></Tab>
                        </>
                    ) : (
                        <>
                            <Link to='/signup'><Tab label="Sign up" sx={commonTab}></Tab></Link>
                            <Link to='/login'><Tab label="Log in" sx={commonTab} style={highlightTab}></Tab></Link>
                        </>
                    )}
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}
