import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import SearchForm from '../components/SearchForm'

function NavBar(props){

  const [randomNum, setRandomNum] = useState(1)

  const [path, setPath] = useState("")

  const logout = () => {
    localStorage.clear()
  }
  const profile = () => {
    if(props.justLooking){
      props.history.push('./signup')
    } else if (!props.justLooking){
      props.history.push('/profile')
    }
  }
  const home = () => {
    props.history.push('/home')
  }
  const random = () => {
    // const choose = [1,2][Math.floor(Math.random() * 2)]
    if (randomNum === 1){
      const quiz = props.skinnyQuizzes[Math.floor(Math.random() * props.skinnyQuizzes.length)]
      setPath(`/home/quiz/${quiz.id}`)
      setRandomNum(2)
      // props.history.push(`/home/quiz/${quiz.id}`)
    } else if (randomNum === 2){
      const deck = props.skinnyDecks[Math.floor(Math.random() * props.skinnyDecks.length)]
      setPath(`/home/deck/${deck.id}`)
      setRandomNum(1)
      // props.history.push(`/home/deck/${deck.id}`)
    }
    
  }

  return (
    <div id="navbar-wrapper">
      {path !== "" ? 
      <Redirect to={path} /> : null}
      <div id="navbar-left">
        <p onClick={()=>home()}>QuizCard</p>
        <p onClick={()=>profile()}>{props.justLooking ? "Sign Up" : "Profile"}</p>
        <p onClick={()=>random()}>Random</p>
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

const msp = (state) => {
  return {
    justLooking: state.justLooking,
    skinnyQuizzes: state.skinnyQuizzes,
    skinnyDecks: state.skinnyDecks
  }
}


export default connect(msp)(withRouter(NavBar))