import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {populateProfile} from '../redux/actions'
import styled from 'styled-components'
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
    <ProfileWrapper>
      <CardButtonWrapper>
        <ProfileCard user={props.user}/>
        <button
          id="new-deck"
          onClick={handleClick}
        >Create New FlashCard Deck</button>
        <button
          id="new-quiz"
          onClick={handleClick}
        >Create New Quiz</button>
      </CardButtonWrapper>
      <ListWrapper>
        <h3>Your Quizzes & FlashCard Decks</h3>
        <div id="user-created" >
          {props.userCreations.length > 0 ? renderUserCreations() : 
            <p>Get started making your own Quizzes and FlashCard Decks by clicking "Create Quiz" or "Create FlashCard Deck"</p>}
        </div>
        <div id="favs" >
          <h3>Your Favorited Quizzes & FlashCard Decks</h3>
          {props.userFavs.length > 0 ? renderUserFavs() : 
            <p>You currently have no favorited Quizzes or FlashCard Decks</p>
          }
        </div>
      </ListWrapper>
    </ProfileWrapper>
  )
}
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`
const CardButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`



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