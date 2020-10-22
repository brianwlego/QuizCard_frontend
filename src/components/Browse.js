import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


function Browse(props){

  const [chosenCat, setChosenCat] = useState("")

  const renderCategories = () => {
    const cats = props.skinnyDecks.map(deck => deck.category).concat(props.skinnyQuizzes.map(quiz => quiz.category));
    const uniqueCats = [...new Set(cats)];
    return uniqueCats.sort().map((category, index) => {
      return (
        <div 
          className="cat-card" 
          onClick={()=>catClickHandler(category)}
          key={index}
        >
          <div>
            <p className="cat-p">{category}</p>
          </div>
          <div>
            {chosenCat === category ? renderQuizTitles() : null}
            {chosenCat === category ? renderDeckTitles() : null}
          </div>
        </div>
      )
    })
  }
  const catClickHandler = (category) => {
    if (chosenCat === "" || chosenCat !== category){
      setChosenCat(category)
    } else {
      setChosenCat("")
    }
  }
  const renderQuizTitles = () => {
    const quizTitles = props.skinnyQuizzes.filter(quiz => quiz.category === chosenCat)
    if (quizTitles.length > 0){
      return quizTitles.map((quiz) => {
        return(
          <div 
            onClick={()=>props.history.push(`/home/quiz/${quiz.id}`)}
            className="title-card"
            key={quiz.id}
          >
            Quiz: {quiz.title}
          </div>
        )
      })
    }
  }
  const renderDeckTitles = () => {
    const deckTitles = props.skinnyDecks.filter(deck => deck.category === chosenCat)
    if (deckTitles.length > 0){
      return deckTitles.map(deck => {
        return(
          <div 
            onClick={()=>props.history.push(`/home/deck/${deck.id}`)} 
            className="title-card"
            key={deck.id}
          >
            Deck: {deck.title}
          </div>
        )
      })
    }
  }



  return(
    <>
      <div id="cat-list">
        {renderCategories()}
      </div>
    </>
  )
}

const msp = (state) => {
  return{
    skinnyQuizzes: state.skinnyQuizzes,
    skinnyDecks: state.skinnyDecks
  }
}

export default connect(msp)(withRouter(Browse))