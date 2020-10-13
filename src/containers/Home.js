import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DeckCard from '../components/DeckCard';
import QuizCard from '../components/QuizCard';
import DeckShow from '../components/DeckShow';
import QuizShow from '../components/QuizShow';
import { populateHome } from '../redux/actions'
import styled from "styled-components";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const HomeListsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`
const Title = styled.h1`
  text-align: center;
`


function Home (props) {
  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    props.populateHome(token)
  }, [])

  const renderQuizList = () => {
    return props.homeQuizzes.map(quiz => <QuizCard key={quiz.id} quiz={quiz} />)
  }

  const renderDeckList = () => {
    return props.homeDecks.map(deck => <DeckCard key={deck.id} deck={deck} />)
  }

  console.log(props)

  return(
    <>
    {props.history.location.pathname.includes('deck') ? <DeckShow /> :
      props.history.location.pathname.includes('quiz') ? <QuizShow /> :
        props.homeQuizzes !== undefined && props.homeDecks !== undefined ? 
      <HomeWrapper>
        <Title>HOME PAGE</Title>
        <HomeListsWrapper>
          <div id="quiz-list-wrapper">
            <h3>Popular Quizzes</h3>
            {renderQuizList()}
          </div>
          <div id="deck-list-wrapper">
            <h3>Popular FlashCard Decks</h3>
            {renderDeckList()}
          </div>
        </HomeListsWrapper>
      </HomeWrapper>
      :
      <div>Loading...</div>
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