import React, { useState, useEffect , Fragment } from 'react';
import './Login.css';
import { login , clearErrors } from '../../../actions/userAction';
import Button from '@material-ui/core/Button';
import { useDispatch , useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';

const Login = ({setSigninOpen , setLoginOpen}) => {

    const dispatch = useDispatch();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error , loading , user } = useSelector((state) => state.user);

    const handleSignInOpen = () => {
        setSigninOpen(true);
        setLoginOpen(false);
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        
        dispatch(login(email , password));
    }

    useEffect(() => {
        if(error){
            dispatch(clearErrors());
        }
    }, [error , dispatch ]);
    

    return <Fragment>
    {
        loading ?(
            <Loader />
        ):(
            <Fragment>
            <div className='login'>
                <div className='login__leftContainer'></div>
                <form className='login__rightContainer' onSubmit={loginSubmit}>
                    <div className='login__signIn'>
                        LOGIN
                    </div>
                    <div className='login__name'>
                        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='login__password'>
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <p className='login__forgotPass'>Forgot Password?</p>
                    <button className='login__button'>
                        Login
                    </button>
                    <div className='login__signupLink'>
                        <p>Don't have an account? <Button onClick={handleSignInOpen}>SIGN UP</Button></p>
                    </div>
                </form>
            </div>
         </Fragment>
        ) }
    </Fragment>
}

export default Login
