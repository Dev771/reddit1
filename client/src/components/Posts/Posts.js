import React, { useEffect, useState } from 'react';
import DefaultProfilePic from '../assets/ReditDefaultProfile.png';
import { useDispatch } from 'react-redux';

import { likePost } from '../../actions/posts';
import {ArrowUpwardOutlined, ArrowDownwardOutlined, BookmarkBorderOutlined, PostAddRounded } from '@material-ui/icons';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import { Share } from '@material-ui/icons';
import { Player } from 'video-react';

const Posts = ({post}) => {
    const dispatch = useDispatch();
    const [isLiked, setisLiked] = useState(false);
    const [isDisliked, setIsDisLiked] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [muted, setMuted] = useState(true);
    
    const isLike = (state) => {
        if(state === 'liked') {
            dispatch(likePost(post._id, state));
        } else {
            dispatch(likePost(post._id, state));
        }
    }

    const mutedchange = () => {
        setMuted(!muted);
    }

    useEffect(() => {
        if(post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))) {
            setIsDisLiked(false);
            setisLiked(true);
        } else if(post.dislikes.find((dislike) => dislike === (user?.result?.googleId || user?.result?._id))) {
            setIsDisLiked(true);
            setisLiked(false);
        } else if(!post.likes.find((like) => like === (user?.result?._id || user?.result?.googleId)) && !post.dislikes.find((dislike) => dislike === (user?.result?.googleId || user?.result?._id))) {
            setIsDisLiked(false);
            setisLiked(false);
        }
    }, [post.dislikes, post.likes, user?.result?._id, user?.result?.googleId]);

    return (
        <div className='Post'>
            <div className='Vote'>
                <ArrowUpwardOutlined color={!isLiked ? 'inherit' : 'secondary'} onClick={() => isLike('liked')} />
                {post.likes.length - post.dislikes.length}
                <ArrowDownwardOutlined color={!isDisliked ? 'inherit' : 'secondary'} onClick={() => isLike('disliked')} /> 
            </div>
            <div className='ActualPost'>
                <div>
                    <img src={DefaultProfilePic} alt='ProfilePic' className='profilePic' />
                    <label className='Tag'>{post.tags_name}/{post.tags_type}</label>
                    <label className='Date_Of_Post'>Posted by u/{post.creator} ......</label>
                </div>
                <div className='title'>
                    {post.title}
                </div>
                <div className='PostDetails'>
                    {post.post_Type === 'Images' && post.LocImage.split('/')[0] === 'data:image' ? (
                        <img loading='lazy' src={post.LocImage} alt={post.title} />
                    ) : post.post_Type === 'Images' && post.LocImage.split('/')[0] === 'data:video' ? (
                        <>
                            <video width="100%" height='100%' autoPlay={true} muted={muted} loop>
                                <source src={post.LocImage} type={post.LocImage.split(':')[1].split(';')[0]} />
                            </video>
                            <button onClick={mutedchange}>Muted</button>
                        </>
                    ) : post.post_Type === 'Post' && post.LocImage === '' ? (
                        <label>{post.post_Texts}</label>
                    ) : (
                        <label>Hello</label>
                    )}
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
