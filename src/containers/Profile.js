import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {populateProfile, populateQuizScore} from '../redux/actions'
import DeckCard from '../components/DeckCard'
import QuizCard from '../components/QuizCard'
import ProfileCard from '../components/ProfileCard'


function Profile(props){

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (!props.popedProfile){
      props.populateProfile(token)
    }
  }, [])

  const renderUserCreations = () => {
    const creationsSorted = props.userCreations.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))
    return creationsSorted.map(creation => 
      creation.questions ? <QuizCard key={creation.id} quiz={creation} profile={true} /> 
      : <DeckCard key={creation.id} deck={creation} profile={true} />
    )
  }
  const renderUserFavs = () => {
    const favsSorted = props.userFavs.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at))
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
          {sortedScores.map(score => {
            return(
              <div className="profile-score-card" onClick={()=>renderPreviousQuiz(score)}>
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
    if (e.target.id === "new-deck"){
      props.history.push('/profile/newdeck')
    } else if (e.target.id === "new-quiz"){
      props.history.push('/profile/newquiz')
    }
  }

  console.log(props.userScores)

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
    userScores: state.userScores
  }
}
const mdp = (dispatch) => {
  return {
    populateProfile: (token) => dispatch(populateProfile(token)),
    populateQuizScore: (score) => dispatch(populateQuizScore(score))
  }
}

export default connect(msp, mdp)(Profile)