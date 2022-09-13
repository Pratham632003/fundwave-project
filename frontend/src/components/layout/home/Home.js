import React, { Fragment, useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import boy from '../images/home.png';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {clearErrors} from '../../../actions/userAction';
import { Doughnut , Line } from "react-chartjs-2";

function Home({ history}) {
    const [openLogin, setLoginOpen] = useState(false);
    const [openSignin, setSigninOpen] = useState(false);
    const [role , setRole] = useState('user');
    const alert = useAlert();
    const dispatch = useDispatch();
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const {error , user , isAuthenticated } = useSelector((state) => state.user);

    const lineState = {
        labels: ["Initial Students" , "Total Teachers"],
        datasets: [
            {
                label: "Total Users",
                backgroundColor: ["#4DCBFA"],
                hoverBackgroundColor: ["rgb(197 , 72 , 49)"],
                data: [0,4000],
            }
        ],
    };

    const doughnutState = {
        labels: ["Teachers" , "Students"],
        datasets: [
            {
                backgroundColor: ["#4DCBFA","#6800B4"],
                hoverBackgroundColor: ["#6800B4","#4DCBFA"],
                data: [3 , 2],
            },
        ],
    }

    
    const handleLoginClickOpen = (admin) => {
        admin && setRole('admin');
        setLoginOpen(true);
    };

    const handleClose = () => {
        setLoginOpen(false);
        setSigninOpen(false);
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
  
      }, [dispatch, error, alert, history, isAuthenticated]);

    return (
        <Fragment>
            <div className='home'>
                <div className='home__left'>
                    <div className='home__text'>
                        <p className='text'>Help Students React</p>
                        <p className='text'>Their Potential</p>
                        <div className='home__buttons'>
                                {!isAuthenticated && 
                                    <>
                                        <p className='home__button1' onClick={()=>handleLoginClickOpen(true)}>Teacher</p>
                                        <Dialog open={openLogin} onClose={handleClose}>
                                            <DialogContent>
                                            <DialogContentText>
                                                <Login setSigninOpen={setSigninOpen} setLoginOpen={setLoginOpen} />
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                    }
                                    {!isAuthenticated && 
                                    <>
                                        <Dialog open={openSignin} onClose={handleClose}>
                                            <DialogContent>
                                            <DialogContentText>
                                                <Signup role={role} />
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                    }
                                    

                                {!isAuthenticated && 
                                    <>
                                        <p className='home__button2' onClick={()=>handleLoginClickOpen(false)}>Student</p>
                                        <Dialog open={openLogin} onClose={handleClose}>
                                            <DialogContent>
                                            <DialogContentText>
                                                <Login setSigninOpen={setSigninOpen} setLoginOpen={setLoginOpen} />
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                    }
                                    {!isAuthenticated && 
                                    <>
                                        <Dialog open={openSignin} onClose={handleClose}>
                                            <DialogContent>
                                            <DialogContentText>
                                                <Signup role={role}/>
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                    }

                                    {isAuthenticated && user.role === "admin" &&
                                        <>
                                            <Link to='/student/list'><p className='home__button3'>Student List</p></Link>
                                            <Link to='/profile'><p className='home__button4'>My Profile</p></Link>
                                        </>
                                    }

                                    {isAuthenticated && user.role === "user" &&
                                        <>
                                            <Link to='/profile'><p className='home__button4'>My Profile</p></Link>
                                        </>
                                    }
                        </div>
                    </div>
                </div>

                <div className='home__right'>
                    <div className='home__img'>
                        <img src={boy} alt='home' />
                    </div>
                </div>
            </div>
            <div className='home__chart'>
                <div className='lineChart'>
                    <Line data={lineState} />
                </div>

                <div className='doughnutChart'>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </Fragment>
  );
}

export default Home;