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
      <div id="navbar-left">
        <p onClick={home}>QuizCard</p>
        <p onClick={profile}>Profile</p>
      </div>
      <div id="navbar-center">
        <SearchForm />
      </div>
      <div id="navbar-right">
        <p onClick={logout}><a href='/login'>Log Out</a></p>
      </div>
    </div>
  )
}


export default withRouter(NavBar)