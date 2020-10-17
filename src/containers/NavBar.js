import React from 'react'
import { withRouter } from 'react-router-dom'
import SearchForm from '../components/SearchForm'

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
    <div id="navbar-wrapper">
      <ul>
        <li onClick={home}><a href=''>Home</a></li>
        <li onClick={profile}><a href=''>Profile</a></li>
        <SearchForm />
        <li onClick={logout}><a href='/login'>Log Out</a></li>
      </ul>
    </div>
  )
}


export default withRouter(NavBar)