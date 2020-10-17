import React from 'react'
import img from "./blank-profile-picture.png"

function ProfileCard({user}){


  return(
    <div id="profile-card-wrapper">
      {user.img_url === null ? <img alt="" src={img} /> 
      : <img alt="" src={user.img_url}/>}
      <h5>{user.name}</h5>
    </div>
  )
}


export default ProfileCard