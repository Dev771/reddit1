import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { createPost } from '../../actions/posts';
import Loading from '../Loading/Loading';
import { getTags } from '../../actions/tag';

const Form = () => {
    const [postData, setPostData] = useState({ title: '', LocImage: '', tags_name: '', tags_type: ''});
    const dispatch = useDispatch();
    const tags = useSelector((state) => state.tags);
    
    useEffect(() => {
        dispatch(getTags());
    }, [dispatch]);
    
    const clear = () => {
        setPostData({title: '', LocImage: '', tags_name: '', tags_type: ''});
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault();

        dispatch(createPost({...postData}));
        clear();
    }

    return (
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter Title' onChange={(e) => setPostData({...postData, title: e.target.value})} />
            <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({...postData, LocImage: base64})} />
            <input list='tags' onChange={(e) => setPostData({...postData, tags_name: e.target.value})} />
            <datalist id="tags">
                {!tags.length ? <Loading /> : (
                    tags.map((tag) => (
                        <option value={tag.name}></option>
                    ))
                )}
            </datalist>
            <input list='tag' onChange={(e) => setPostData({...postData, tags_type: e.target.value})} />
            <datalist id="tag">
                {!tags.length ? <Loading /> : (
                    tags.map((tag) => (
                        <option value={tag.tagtype}></option>
                    ))
                )}
            </datalist>
            
            <button type='Submit'>Create</button>
        </form>
    )
}

export default Form
