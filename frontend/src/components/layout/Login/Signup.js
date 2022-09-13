import React, { Fragment , useEffect , useState } from 'react';
import { register , clearErrors } from '../../../actions/userAction';
import { useDispatch , useSelector} from 'react-redux';
import Loader from '../../Loader/Loader';


const Login = ({role}) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: role
      });
    
      const { name , email , password} = user;


    
    const { error , loading } = useSelector((state) => state.user);

    const registerSubmit = (e) => {
      e.preventDefault();
      dispatch(register({name , email , password , role}));
    };

    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

  
      
    useEffect(() => {
        if(error){
            dispatch(clearErrors());
        }
    }, [error , dispatch ]);

    return<Fragment>
    {
        loading ?(
            <Loader />
        ):(
     <Fragment>
        <div className='login'>
            <div className='signup__leftContainer'>
            </div>
            <form className='login__rightContainer' onSubmit={registerSubmit}>
                <div className='login__signIn'>
                    SIGN UP
                </div>
                <div className='login__name'>
                    <input type='text' placeholder='name' name="name" value={name} onChange={registerDataChange}  required />
                </div>
                <div className='login__name'>
                    <input type='email' placeholder='Email Id' name="email" value={email} onChange={registerDataChange} required />
                </div>
                <div className='login__password'>
                    <input type='password' placeholder='Password' name="password" value={password} onChange={registerDataChange} required />
                </div>
                <button className='login__button'>
                    Create Account
                </button>
            </form>
        </div>
        </Fragment>
        ) }
    </Fragment>
}

export default Login
