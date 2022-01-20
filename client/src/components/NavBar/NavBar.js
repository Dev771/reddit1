import React from 'react'
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
import DefaultProfilePic from '../assets/ReditDefaultProfile.png';
import { Link } from 'react-router-dom';

import './Styles.css';

const NavBar = () => {

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
            <div className='Profile'>
                <div>
                    <img src={DefaultProfilePic} alt='Profile Pic' />
                    <span className='userstate'></span>
                </div>
                <label>User_Name</label>
            </div>
        </nav>
    )
}

export default NavBar
