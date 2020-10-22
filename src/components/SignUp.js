import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp, setSignUp} from '../redux/actions'

function SignUp (props){
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profile_picture, setProfilePicture] = useState('')
  const [photoURL, setPhotoURL] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('user[first_name]', first_name)
    formData.append('user[last_name]', last_name)
    formData.append('user[email]', email)
    formData.append('user[password]', password)
    formData.append('profile_picture', profile_picture)

    props.signUp(formData, props.history)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setProfilePicture('')
  }
  const closeSignup = (e) => {
    if (e.target.id === "sign-up-modal"){
      props.setSignUp()
    }
  }
  const handleFile = (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setProfilePicture(file)
      setPhotoURL(fileReader.result)
    }
    if (file){
      fileReader.readAsDataURL(file)
    }
  }
  const renderErrors = () => {
    return props.errors.map((error,index) => {
      return <p key={index}>{error}</p>
    })
  }



  return(
    <div id="sign-up-modal" onClick={closeSignup}>
      <div id="sign-up">
        {props.errors.length > 0 && !props.errors[0].includes('Invalid') ? renderErrors() : null}
        <h3>Sign Up</h3>
        <form onSubmit={submitHandler}>
          <input 
            type="text"
            name="first_name"
            placeholder="First Name..."
            value={first_name}
            onChange={(e)=>setFirstName(e.target.value)}
          />
          <input 
            type="text"
            name="last_name"
            placeholder="Last Name..."
            value={last_name}
            onChange={(e)=>setLastName(e.target.value)}
          />
          <input 
            type="text"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input 
            type="text"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <input 
          id="userfile"
          type="file"
          name="profile_picture" 
          accept="image/*"
          hidden
          onChange={(e)=>handleFile(e)}
          />
          <label id="form-file-button" for="userfile" >Add photo</label>
          {photoURL !== "" ? <img src={photoURL} alt="" id="photo-preview" /> : null}
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    signup: state.signup,
    errors: state.errors
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser, history) => dispatch(signUp(newUser, history)),
    setSignUp: () => dispatch(setSignUp())
  }
}

const SignUpWithRouter = withRouter(SignUp)

export default connect(mapStateToProps, mapDispatchToProps)(SignUpWithRouter)