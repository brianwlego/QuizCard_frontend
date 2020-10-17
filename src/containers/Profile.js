import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {populateProfile} from '../redux/actions'
import DeckCard from '../components/DeckCard'
import QuizCard from '../components/QuizCard'
import ProfileCard from '../components/ProfileCard'


function Profile(props){

  useEffect(()=>{
    const token = localStorage.getItem("token")
    props.populateProfile(token)
  }, [])

  const renderUserCreations = () => {
    return props.userCreations.map(creation => 
      creation.questions ? <QuizCard key={creation.id} quiz={creation} profile={true} /> 
      : <DeckCard key={creation.id} deck={creation} profile={true} />
    )
  }
  const renderUserFavs = () => {
    return props.userFavs.map(creation => 
      creation.questions ? <QuizCard key={creation.id} quiz={creation} /> 
      : <DeckCard key={creation.id} deck={creation}/>
    )
  }
  const handleClick = (e) => {
    e.persist()
    if (e.target.id === "new-deck"){
      props.history.push('/profile/newdeck')
    } else if (e.target.id === "new-quiz"){
      props.history.push('/profile/newquiz')
    }
  }


  return(
    <div id="profile-wrapper">
      <div id="profile-card-wrapper">
        <ProfileCard user={props.user}/>
        <button
          id="new-deck"
          className="profile-card-button"
          onClick={handleClick}
        >Create New FlashCard Deck</button>
        <button
          id="new-quiz"
          className="profile-card-button"
          onClick={handleClick}
        >Create New Quiz</button>
      </div>
      <div className="profile-list-wrapper">
        <h3>Your Quizzes & FlashCard Decks</h3>
        <div id="user-created" >
          {props.userCreations.length > 0 ? renderUserCreations() : 
            <p>Get started making your own Quizzes and FlashCard Decks by clicking "Create Quiz" or "Create FlashCard Deck"</p>}
        </div>
        <h3>Your Favorited Quizzes & FlashCard Decks</h3>
        <div id="favs" >
          {props.userFavs.length > 0 ? renderUserFavs() : 
            <p>You currently have no favorited Quizzes or FlashCard Decks</p>
          }
        </div>
      </div>
    </div>
  )
}

const msp = (state) => {
  return {
    user: state.user,
    userCreations: state.userCreations,
    userFavs: state.userFavs
  }
}
const mdp = (dispatch) => {
  return {
    populateProfile: (token) => dispatch(populateProfile(token))
  }
}

export default connect(msp, mdp)(Profile)