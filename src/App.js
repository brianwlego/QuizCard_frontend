import React, {useEffect} from 'react';
import { Route, withRouter } from 'react-router-dom'
import Login from './components/Login'
import Home from './containers/Home'
import Profile from './containers/Profile'
import DeckForm from './components/DeckForm'
import QuizForm from './components/QuizForm'
import NavBar from './containers/NavBar'
import Wakeup from './components/Wakeup'
import './App.css';
import './AppScale.css'
import { connect } from 'react-redux';
import { checkToken } from './redux/actions'


function App(props) {


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token !== "undefined" && token !== null){
      props.checkToken(token)
    } else {
      props.history.push('/login')
    }
  }, [])

  console.log(props)

  return (
    <div id="app-wrapper">
      {props.location.pathname !== '/login' ? <NavBar />: null}
      <Route path="/home" component={Home}/>
      <Route path="/profile/newdeck" exact component={DeckForm}/>
      <Route path="/profile/newquiz" exact component={QuizForm}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/login" component={Login}/>
      <Route path="/wakeup" exact component={Wakeup}/>
    </div>
  );
}

const msp = (state) => {
  return {
    user: state.user,
    signup: state.signup,
    justLooking: state.justLooking
  }
}
const mdp = (dispatch) => {
  return {
    checkToken: (token) => dispatch(checkToken(token))
  }
}

const AppWithRouter = withRouter(App)

export default connect(msp, mdp)(AppWithRouter)
