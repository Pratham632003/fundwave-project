import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import './Students.css';
import { getAllUsers, updateUser , clearErrors} from '../../actions/userAction';

function Student() {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    const { users , error } = useSelector(state => state.allUsers);

    const updateAttendance = (id) => {
        dispatch(updateUser(id));
        alert.success("Attendance Updated Successfully");
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }

        dispatch(getAllUsers());
    }, [dispatch , error , users , alert]);


    return <Fragment>
        <div className='student'>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Sno</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Attendance</th>
                <th scope="col">Mark Attendance</th>
                </tr>
            </thead>
            <tbody>
                {
                    users && users.map((user, index) => {
                        return user?.role === "user" ? <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>

                            {user.attendance && user.attendance === "Absent" 
                            ? <td className='red'>{user.attendance}</td> : <td className='green'>{user.attendance}</td>}
                            
                            <td><button onClick={()=>updateAttendance(user._id)}>{user.attendance === "Absent" ? "Mark Present?" : "Mark Absent?"}</button></td>
                        </tr> : null;
                    })
                }
            </tbody>
            </table>
        </div>
        
    </Fragment>
}

export default Student;