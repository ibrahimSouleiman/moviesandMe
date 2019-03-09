



import { createStore, combineReducers } from 'redux';

import toggleFavorite from './Reducers/favorieReducer'

import setAvatar from './Reducers/avatarReducer'
import {persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// export default createStore(combineReducers({toggleFavorite, setAvatar}))



const rootPersistConfig = {
    key: 'root',
    storage: storage
}
export default createStore(persistCombineReducers(rootPersistConfig,{toggleFavorite, setAvatar}))