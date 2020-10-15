import React from 'react'
import styled from 'styled-components'
import img from "./blank-profile-picture.png"

function ProfileCard({user}){


  return(
    <CardWrapper>
      {user.img_url === null ? <ProfilePicture alt="" src={img} /> 
      : <ProfilePicture alt="" src={user.img_url}/>}
      <h5>{user.name}</h5>
    </CardWrapper>
  )
}
const ProfilePicture = styled.img` 
  max-height: 150px;
  width: auto;
  min-width: 100px;
`

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 2%;
  padding: 10px;
`

export default ProfileCard