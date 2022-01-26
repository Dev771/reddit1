import React, { useEffect } from 'react';
import DefaultProfilePic from '../assets/ReditDefaultProfile.png';
import GallaryIcon from '@material-ui/icons/ImageOutlined';
import BestIcon from '@material-ui/icons/GraphicEq'
import Link from '@material-ui/icons/Link'
import HotIcon from '@material-ui/icons/Whatshot';
import NewIcon from '@material-ui/icons/NewReleases';
import ToptierIcon from '@material-ui/icons/BarChart';
import OptionAltIcon from '@material-ui/icons/MoreHorizOutlined'

import UpArrowIcon from '@material-ui/icons/ArrowDropUpTwoTone';
import Posts from '../Posts/Posts';
import { useSelector } from 'react-redux';
import { getPost } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import Loading from '../Loading/Loading';

import './Styles.css';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);
    
    return (
        <>
            <div className='HomePage'>
                <div></div>
                <div className='PostSide'>
                    <div className='SearchPost'>
                        <img src={DefaultProfilePic} alt='profilePic' />
                        <input type="search" placeholder='Search Post'></input>
                        <span title="Create Media Post"><GallaryIcon /></span>
                        <span title="Add Link"><Link /></span>
                    </div>
                    <div className='PostPrefrence'>
                        <div>
                            <span title='Best' className='active'><BestIcon /> Best</span>
                            <span title='Hot'><HotIcon /> Hot</span>
                            <span title='New'><NewIcon /> New</span>
                            <span title='Top'><ToptierIcon /> Top</span>
                            <span><OptionAltIcon /></span>
                        </div>
                        {/* <div>
                            <span><TableIcon /></span>
                        </div> */}
                    </div>
                    {!posts.length ? <Loading /> : (
                        posts.map((post) => (
                            <Posts post={post} key={post._id} />
                        ))
                    )}
                    
                </div>
                <div className='CommunityPost'>
                    <div className='RecTag'>
                        <div style={{ backgroundImage: `url(${DefaultProfilePic})`}} className='RecTagTitle'>Home</div>
                        <div className='RecTagList'>
                            <div className='TagListTab'>
                                1. <UpArrowIcon /> 
                                <span className='tagIcon'></span>
                                r/tagName
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    )
}

export default Home
