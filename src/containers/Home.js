import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DeckCard from '../components/DeckCard';
import QuizCard from '../components/QuizCard';
import DeckShow from '../components/DeckShow';
import QuizShow from '../components/QuizShow';
import { populateHome } from '../redux/actions'



function Home (props) {
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    props.populateHome(token)
    setLoading(true)
  }, [])
  
  const renderQuizList = () => {
    return props.homeQuizzes.map(quiz => <QuizCard key={quiz.id} quiz={quiz} />)
  }
  
  const renderDeckList = () => {
    return props.homeDecks.map(deck => <DeckCard key={deck.id} deck={deck} />)
  }
  
  
  return(
    <>
    {props.history.location.pathname.includes('deck') ? <DeckShow /> :
      props.history.location.pathname.includes('quiz') ? <QuizShow /> :
      <div id="home-wrapper">
        <h1>HOME PAGE</h1>
        <div id="home-lists-wrapper">
          <div id="quiz-list-wrapper">
          <h3>Popular Quizzes</h3>
            {props.homeQuizzes !== undefined ? renderQuizList() : <div>Loading...</div>}
          </div>
          <div id="deck-list-wrapper">
          <h3>Popular FlashCard Decks</h3>
            {props.homeDecks !== undefined ? renderDeckList() : <div>Loading...</div>}
          </div>
        </div>
      </div>
      }
    </>
  )
}


const msp = (state) => {
  return {
    homeDecks: state.homeDecks,
    homeQuizzes: state.homeQuizzes
  }
}
const mdp = (dispatch) => {
  return {
    populateHome: (token) => dispatch(populateHome(token))
  }
}


export default connect(msp, mdp)(Home)