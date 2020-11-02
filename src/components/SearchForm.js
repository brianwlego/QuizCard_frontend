import React, { useState } from 'react'
import { connect } from 'react-redux'

function SearchForm(props){
  const [searchValue, setSearchValue] = useState("")
  const [quizSuggestions, setquizSuggestions] = useState([])
  const [deckSuggestions, setDeckSuggestions] = useState([])


  const changeHandler = (e) => {
    e.persist()
    setSearchValue(e.target.value)
    if (searchValue.length > 0){
      setquizSuggestions(props.skinnyQuizzes.filter(quiz => quiz.category.toLowerCase().includes(searchValue.toLowerCase()) || quiz.title.toLowerCase().includes(searchValue.toLowerCase())))

      setDeckSuggestions(props.skinnyDecks.filter(deck => deck.category.toLowerCase().includes(searchValue.toLowerCase()) || deck.title.toLowerCase().includes(searchValue.toLowerCase())))
    }
  }

  const mapQuizzes = () => {
    return quizSuggestions.map(quiz => {
      return (
        <div className="search-item">
          <a href={`/home/quiz/${quiz.id}`} className="search-link">
            <p>{quiz.title} {quiz.category}</p>
          </a>
        </div>
      )
    })
  }
  const mapDecks = () => {
    return deckSuggestions.map(deck => {
      return (
        <div className="search-item">
          <a href={`/home/deck/${deck.id}`} className="search-link">
            <p>{deck.title} {deck.category}</p>
          </a>
        </div>
      )
    })
  }

  
  return(
    <div id="search-wrapper">
      <form id="search-form" style={props.justLooking ? {marginRight: "2em"} : null}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={changeHandler}
        />
      </form>
      <div id="search-list" >
        {searchValue.length > 0 ? mapQuizzes() : null}
        {searchValue.length > 0 ? mapDecks() : null}
      </div>
    </div>
  )
}

const msp = (state) => {
  return{
    justLooking: state.justLooking,
    skinnyQuizzes: state.skinnyQuizzes,
    skinnyDecks: state.skinnyDecks
  }
}

export default connect(msp, null)(SearchForm)