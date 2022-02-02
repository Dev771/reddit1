import React, { useState, useEffect } from 'react'
import Reddit from '@material-ui/icons/Reddit'
import HomeIcon from '@material-ui/icons/HomeRounded';
import DownArrow from '@material-ui/icons/ArrowDropDownSharp';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import NorthEastIcon from '@material-ui/icons/TrendingUpOutlined';
import AllIcon from '@material-ui/icons/AllInbox';
import LiveIcon from "@material-ui/icons/LiveTv"
import MessageIcon from '@material-ui/icons/MessageOutlined'
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import AddPostIcon from '@material-ui/icons/Add'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Avatar, Badge } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

import { LOGOUT } from '../../constants/index';
import './Styles.css';

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [SignInUser, setSignInUser] = useState(JSON.parse(localStorage.getItem('profile')));


    
    useEffect(() => {
        const token = SignInUser?.token;
        
        if(token) {
            const decodeToken = decode(token);
            
            if(decodeToken.exp * 1000 < new Date().getTime()) logout();
        }
        
        setSignInUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    
    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/');
        setSignInUser(null);
    }

    return (
        <nav>
            <a href='/' className='BrandIcon'>
                <span><Reddit /></span>
                <label>reddit</label>
            </a>
            <button><HomeIcon fontSize="medium" /> Home <DownArrow /></button>
            <div className='SearchBar'>
                <label  htmlFor='search'><SearchIcon /></label>
                <input id='search' type='search' placeholder="Search Reddit"></input>
            </div>
            <div className='R-contents'>
                <span title='Popular'><NorthEastIcon /></span>
                <span title='All'><AllIcon /></span>
                <span title='Live Reddit'><LiveIcon  /></span>
            </div>
            <div className='R-contents'>
                <span title="Chat"><MessageIcon /></span>
                <span title="Notification"><NotificationIcon /></span>
                <Link to='/CreatePost' title="Add Post"><AddPostIcon /></Link>
            </div>
            {!SignInUser ? (
                <div className='Profile'>
                    <Button component={Link} to='/auth/SignIn' variant='contained' color='secondary' >Login</Button>
                    <Button component={Link} to='/auth/SignUp' variant='contained' color='secondary'>Register</Button>
                </div>
            ) :  (
                <div className='Profile' onClick={logout}>
                    {/* <div> */}
                    <Badge overlap='circular' variant='dot' anchorOrigin={{  vertical: 'bottom', horizontal: 'right'}} color='error' >
                        <Avatar style={{ width: '30px', height: '30px'}} alt={SignInUser?.result.name} src={SignInUser?.result.imageUrl} >{SignInUser?.result.name.charAt(0)}</Avatar>
                    </Badge>
                        {/* <span className='userstate'></span> */}
                    {/* </div> */}
                    <label>{SignInUser?.result?.name}</label>
                </div>
            )}
        </nav>
    )
}

export default NavBar
