import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


const Profile = () => {
     const { user } = useContext(AuthContext);
     let username="";
     if(user){
           username=user.username;
     }
  return (
    <div>
        <p>Name = {username}</p>
    </div>
  )
}

export default Profile