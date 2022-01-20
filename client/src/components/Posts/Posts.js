import React, { useState } from 'react';
import DefaultProfilePic from '../assets/ReditDefaultProfile.png';
import { useDispatch } from 'react-redux';

import { likePost } from '../../actions/posts';
import {ArrowUpwardOutlined, ArrowDownwardOutlined, BookmarkBorderOutlined } from '@material-ui/icons';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import { Share } from '@material-ui/icons';

const Posts = ({post}) => {
    const dispatch = useDispatch();
    const [isLiked, setisLiked] = useState(false);
    const [isDisliked, setIsDisLiked] = useState(false);
    
    const isLike = (state) => {
        if(state === 'liked') {
            setisLiked(!isLiked);
            setIsDisLiked(false);
            dispatch(likePost(post._id, 'like'));
        } else {
            setIsDisLiked(!isDisliked);
            setisLiked(false);
            post.like--;
        }
    }

    return (
        <div className='Post'>
            <div className='Vote'>
                <ArrowUpwardOutlined color={!isLiked ? 'inherit' : 'secondary'} onClick={() => isLike('liked')} />
                {post.likes}
                <ArrowDownwardOutlined color={!isDisliked ? 'inherit' : 'secondary'} onClick={() => {setIsDisLiked(!isDisliked); setisLiked(false);}} /> 
            </div>
            <div className='ActualPost'>
                <div>
                    <img src={DefaultProfilePic} alt='ProfilePic' className='profilePic' />
                    <label className='Tag'>{post.tags_name}/{post.tags_type}</label>
                    <label className='Date_Of_Post'>Posted On ......</label>
                </div>
                <div className='title'>
                    {post.title}
                </div>
                <div className='PostDetails'>
                    <img src={post.LocImage} alt={post.title} />
                </div>
                <div className='PostAction'>
                    <span><CommentIcon /> 24 Comments</span>
                    <span><Share /> Share</span>
                    <span><BookmarkBorderOutlined /> Save</span>
                </div>
            </div>
        </div>
    )
}

export default Posts
