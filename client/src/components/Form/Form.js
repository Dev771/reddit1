import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { createPost } from '../../actions/posts';
import { getTags } from '../../actions/tag';
import { ButtonGroup, TextField } from '@material-ui/core';
import { PostAdd, Photo, Link, List } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import ContentEditable from 'react-contenteditable';
import './Styles.css';
import useStyles from './Styles';

const Form = () => {
    const [activebutton, setactiveButton] = useState('Post');
    const [postData, setPostData] = useState({ title: '', LocImage: '', tags_name: '', tags_type: '', creator: '', creatorEmail: '', post_Texts: '', post_Type: activebutton});
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.tags);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();

    useEffect(() => {
        dispatch(getTags());
    }, [dispatch]);
    
    const clear = () => {
        setPostData({title: '', LocImage: '', tags_name: '', tags_type: '', creator: '', creatorEmail: '', post_Type: activebutton, post_Texts: '' });
    }

    const handleSubmit = (e) =>  {
        e.preventDefault();

        dispatch(createPost({...postData, creator: user?.result?.name, creatorEmail: user?.result?.email, post_Type: activebutton}, navigate));
        clear();
    }


    return (
        <div className='createForm'>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <div className='CreatePostTop'>
                    <label>Create a Post</label>
                    <a href='/#'>draft 0</a>
                </div>
                <hr style={{ width: '100%', opacity: '.3' }} />
                <div className='chooseTag'>
                    <Autocomplete
                        id="Tags"
                        className={classes.Autocomplete}
                        classes={classes}
                        options={tags}
                        onSelect={(e) => setPostData({...postData, tags_name: e.target.value})}
                        renderInput={params => (
                            <TextField required className={classes.textfield}  {...params} label="Post Type" variant="outlined" />
                        )}
                        onChange={(e) => setPostData({...postData, tagname: e.target.value})}
                        getOptionLabel={option => option.name}
                        style={{ width: '130px', border: '1px solid #fff2', background: '#1A1A1B', borderRadius: '5px' }}
                    />
                    <Autocomplete
                        id="Tags"
                        options={tags}
                        autoHighlight
                        onSelect={(e) => setPostData({...postData, tags_type: e.target.value})}
                        className={classes.Autocomplete}
                        renderInput={params => (
                            <TextField required className={classes.textfield} style={{fontSize: '10px'}} {...params} label="Tag Name"  variant="outlined" />
                        )}
                        style={{ width: 270, border: '1px solid #fff2', background: '#1A1A1B', borderRadius: '5px' }}
                        getOptionLabel={option => option.tagtype}
                    />
                </div>
                <ButtonGroup style={{ margin: '1em 0 0 0', width: '100%' }} className='ButtonGroup'>
                    <button type='button' className={activebutton === 'Post' ? 'focusClass' : ''} onClick={() => setactiveButton('Post')}><PostAdd />Post</button>
                    <button type='button' className={activebutton === 'Images' ? 'focusClass' : ''} onClick={() => setactiveButton('Images')}><Photo />Image and Video</button>
                    <button type='button' className={activebutton === 'Link' ? 'focusClass' : ''} onClick={() => setactiveButton('Link')}><Link />Link</button>
                    <button type='button' className={activebutton === 'Poll' ? 'focusClass' : ''} onClick={() => setactiveButton('Poll')}><List />Poll</button>
                </ButtonGroup>
                <div className='Postdata'>
                    <div>
                        {activebutton === 'Post' ? (
                            <>
                                <input type='text' required placeholder='Enter Title' onChange={(e) => setPostData({...postData, title: e.target.value})} />
                                <ContentEditable
                                    required
                                />
                                <div className='editablediv'>
                                    <div contentEditable ></div>
                                </div>
                            </>
                        ) : activebutton === 'Images' ? (
                            <>
                                <input type='text' required placeholder='Enter Title' onChange={(e) => setPostData({...postData, title: e.target.value})} />
                                <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({...postData, LocImage: base64})} />
                            </>
                        ) : activebutton === 'Link' ? (
                            <label>Link</label>
                        ) : (
                            <label>Poll</label>
                        )}
                        <hr style={{ width: '100%', opacity: '.3' }} />
                        <div className='postDatabuttons'>
                            <button type='button'>Cancel</button>
                            <button type='Submit'>Create</button>
                        </div>
                    </div>
                </div>
            </form>
            <div style={{background: 'red'}}></div>
        </div>
    )
}

export default Form
