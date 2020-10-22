import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {populateProfile, populateQuizScore} from '../redux/actions'
import DeckCard from '../components/DeckCard'
import QuizCard from '../components/QuizCard'
import ProfileCard from '../components/ProfileCard'


function Profile(props){



  useEffect(()=>{
    if (!props.populatedProfile){
      props.populateProfile()
    }

  }, [])

  const renderUserCreations = () => {
    let creationsSorted = props.userCreations.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))
    return creationsSorted.map((creation, index) => 
      creation.questions ? <QuizCard key={index} quiz={creation} profile={true} /> 
      : <DeckCard key={index} deck={creation} profile={true} />
    )
  }
  const renderUserFavs = () => {
    let favsSorted = props.userFavs.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))
    return favsSorted.map(creation => 
      creation.questions ? <QuizCard key={creation.id} quiz={creation} /> 
      : <DeckCard key={creation.id} deck={creation}/>
    )
  }
const renderPreviousQuiz = (score) => {
  props.populateQuizScore(score)
  props.history.push(`/home/quiz/${score.quiz_id}`)
}

  const renderUserScores = () => {
    const sortedScores = props.userScores.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
    return(
        <div id="profile-score-list">
          {sortedScores.map((score, index) => {
            return(
              <div className="profile-score-card" onClick={()=>renderPreviousQuiz(score)} key={index}>
                <div className="left-score-content">
                  <p>quiz</p>
                  <p>user</p>
                  <p>percent</p>
                  <p>date</p>
                </div>
                <div className="right-score-content">
                  <p style={{whiteSpace: "nowrap"}}>{score.quiz_title}</p>
                  <p>{score.user_name}</p>
                  <p>{score.percent}%</p>
                  <p>{score.date}</p>
                </div>
              </div>
            )
          }) }
        </div>
    )
  }
  const handleClick = (e) => {
    e.persist()
    const profile = document.getElementById('profile-wrapper')
    if (e.target.id === "new-deck"){
      profile.className = "animate__animated animate__fadeOutDown"
      props.history.push('/profile/newdeck')
    } else if (e.target.id === "new-quiz"){
      profile.className = "animate__animated animate__fadeOutDown"
      props.history.push('/profile/newquiz')
    }
  }



  return(
  
    <div id="profile-wrapper">
      <div id="left-side-profile-wrapper">
        <div id="profile-card-outer-wrapper">
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
        <div id="score-list-profile-wrapper">
          <h3>Quiz Scores</h3>
            {props.userScores.length > 0 ? renderUserScores() : 
              <p>You don't have any recorded scores</p>
            }
        </div>
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
    userFavs: state.userFavs,
    userScores: state.userScores,
    populatedProfile: state.populatedProfile
  }
}
const mdp = (dispatch) => {
  return {
    populateProfile: () => dispatch(populateProfile()),
    populateQuizScore: (score) => dispatch(populateQuizScore(score))
  }
}

export default connect(msp, mdp)(Profile)