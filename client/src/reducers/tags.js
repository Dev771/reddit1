import { CREATE_TAG, FETCH_ALL_TAGS } from '../constants/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default (tags=[], actions) => {
    switch(actions.type) {
        case FETCH_ALL_TAGS:
            return actions.payload;
        case CREATE_TAG:
            return [...tags, actions.payload];
        default:
            return tags;
    }
}