import React from 'react';
import {useSelector , useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentUser } from 'auth/authSlice';
import { DEFAULT_PATHS } from '../../config';

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;
const Logout = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isLogin, currentUser } = useSelector((state) => state.auth);
    console.log(isLogin);
    dispatch(setCurrentUser(''));
    // console.log(isLogin);
    const path = `${appRoot}/login`; 
    history.push(path);
    return (<></>);
}
export default Logout;