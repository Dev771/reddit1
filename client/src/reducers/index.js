import { combineReducers } from 'redux';

import posts from './posts';
import tags from './tags';

export const reducers = combineReducers({ posts, tags });