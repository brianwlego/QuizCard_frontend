import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DeckCard from '../components/DeckCard';
import QuizCard from '../components/QuizCard';
import DeckShow from '../components/DeckShow';
import QuizShow from '../components/QuizShow';
import Browse from '../components/Browse'
import { populateHome, populateBrowse, populateProfile, addQuizzes, addDecks } from '../redux/actions'



function Home (props) {

  
  useEffect(()=>{
    
    if (props.skinnyQuizzes.length === 0){
      props.populateBrowse()
    }
    if (!props.populatedHome){
      props.populateHome()
    }
    if (!props.populatedProfile && props.user !== ""){
      props.populateProfile()
    }
  }, [])
  
  const renderQuizList = () => {
    return props.homeQuizzes.map(quiz => <QuizCard key={quiz.id} quiz={quiz} />)
  }
  const handleQuizScroll = (e) => {
    let el = e.target
    let size = props.homeQuizMeta.pagination.total_objects
    if (el.scrollHeight - el.scrollTop === el.clientHeight && props.homeQuizzes.length < size){
      props.addQuizzes(props.homeQuizMeta, props.homeQuizzes.length)
    }
  }
  const renderDeckList = () => {
    return props.homeDecks.map(deck => <DeckCard key={deck.id} deck={deck} />)
  }
  const handleDeckScroll = (e) => {
    let el = e.target
    let size = props.homeDeckMeta.pagination.total_objects
    if (el.scrollHeight - el.scrollTop === el.clientHeight && props.homeDecks.length < size){
      props.addDecks(props.homeDeckMeta)
    }
  }



  return(
    <>
    {props.history.location.pathname.includes('deck') ? <DeckShow /> :
      props.history.location.pathname.includes('quiz') ? <QuizShow /> :
      <div id="home-wrapper">
        <h1>HOME PAGE</h1>
        <div id="home-lists-wrapper">
          <div id="quiz-list-wrapper" onScroll={(e)=>handleQuizScroll(e)}>
          <h3>Quizzes</h3>
            {props.homeQuizzes.length > 0 ? null : <div>Loading...</div>}
            {renderQuizList()}
            {props.homeQuizMeta.pagination ? props.homeQuizzes.length < props.homeQuizMeta.pagination.total_objects ? <div>Loading...</div> : null : null}
          </div>

          <div id="browse-wrapper">
            <h3>Browse</h3>
            <Browse />
          </div>  

          <div id="deck-list-wrapper" onScroll={(e)=>handleDeckScroll(e)}>
          <h3>FlashCard Decks</h3>
            {renderDeckList()}
            {props.homeDecks.length > 0 ? null : <div>Loading...</div>}
            {props.homeDeckMeta.pagination ? props.homeDecks.length < props.homeDeckMeta.pagination.total_objects ? <div>Loading...</div> : null : null}
          </div>
        </div>
      </div>
      }
    </>
  )
}


const msp = (state) => {
  return {
    user: state.user,
    homeDecks: state.homeDecks,
    homeDeckMeta: state.homeDeckMeta,
    homeQuizzes: state.homeQuizzes,
    homeQuizMeta: state.homeQuizMeta,
    skinnyDecks: state.skinnyDecks, 
    skinnyQuizzes: state.skinnyQuizzes,
    populatedProfile: state.populatedProfile,
    populatedHome: state.populatedHome
  }
}
const mdp = (dispatch) => {
  return {
    populateHome: () => dispatch(populateHome()),
    populateBrowse: () => dispatch(populateBrowse()),
    populateProfile: () => dispatch(populateProfile()),
    addQuizzes: (quizMeta) => dispatch(addQuizzes(quizMeta)),
    addDecks: (deckMeta) => dispatch(addDecks(deckMeta)),
  }
}


export default connect(msp, mdp)(Home)