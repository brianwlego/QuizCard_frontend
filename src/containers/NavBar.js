import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

function NavBar(props){

  const logout = () => {
    localStorage.clear()
  }
  const profile = () => {
    props.history.push('/profile')
  }
  const home = () => {
    props.history.push('/home')
  }

  return (
    <Header>
      <button onClick={profile}>Profile</button>
      <button onClick={home} >Home</button>
      <a href='/login' ><button onClick={logout}>Log Out</button></a>
    </Header>
  )
}

const Header = styled.div` 
  width: 25%;
  position: fixed;
  display: flex;
  justify-content: right;
  height: 10vh;
  background-color: #73c4f0;
`


export default withRouter(NavBar)