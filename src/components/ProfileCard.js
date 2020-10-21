import React from 'react'
import img from "./blank-profile-picture.png"

function ProfileCard({user}){


  return(
    <div id="profile-card-wrapper">
      {user.img_url === null || user.img_url === "" ? <img alt="" src={img} /> 
      : <img alt="" src={user.img_url}/>}
      <h5>{user.name}</h5>
    </div>
  )
}


export default ProfileCard