import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { loginUser, setSignUp, setJustLooking, populateBrowse, populateHome } from '../redux/actions'
import SignUpWithRouter from './SignUp'

function Login (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(()=>{
    props.populateBrowse()
    props.populateHome()
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }
    props.loginUser(user, props.history)
    setEmail("")
    setPassword("")
  }

  const handleJustLooking = () => {
    props.setJustLooking()
    props.history.push('./home')
  }

  const renderErrors = () => {
    return props.errors.map((error,index) => {
      return <p key={index}>{error}</p>
    })
  }


  return(
    <div id="login">
      <h1>Welcome to QuizCard</h1>
      {props.errors.length === 1 ? !props.signup ? renderErrors() : null : null}
      <h2>Log In</h2>
      <form onSubmit={submitHandler}>
        <input 
          type="text"
          placeholder="Email..."
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          name="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="submit"
          value="Log In"
        />
      </form>
        <button onClick={props.setSignUp} >Click To Sign Up</button>
        <button onClick={() => handleJustLooking()}>Just Looking? Click Here</button>
      {props.signup ? <SignUpWithRouter /> : null }
    </div>
  )
}

const msp = (state) => {
  return {
    user: state.user,
    signup: state.signup,
    errors: state.errors
  }
}
const mdp = (dispatch) => {
  return {
    loginUser: (user, history) => dispatch(loginUser(user, history)),
    setSignUp: () => dispatch(setSignUp()),
    setJustLooking: () => dispatch(setJustLooking()),
    populateBrowse: () => dispatch(populateBrowse()),
    populateHome: () => dispatch(populateHome())
  }
}


export default connect(msp, mdp)(Login)