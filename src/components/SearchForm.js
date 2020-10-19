import React, { useState } from 'react'
import { connect } from 'react-redux'

function SearchForm(props){
  const [searchValue, setSearchValue] = useState("")
  const [suggestions, setSuggestions] = useState([])


  const changeHandler = (e) => {
    e.persist()
    setSearchValue(e.target.value)
    if (searchValue.length > 0){
      let quizSuggestions = props.homeQuizzes.filter(quiz => quiz.category.toLowerCase().includes(searchValue.toLowerCase()) || quiz.title.toLowerCase().includes(searchValue.toLowerCase()))
      let deckSuggestions = props.homeDecks.filter(deck => deck.category.toLowerCase().includes(searchValue.toLowerCase()) || deck.title.toLowerCase().includes(searchValue.toLowerCase()))
      let combined = quizSuggestions.concat(deckSuggestions) 
      setSuggestions(combined)
    }
  }

  const mapQuizzesDecks = () => {
    return suggestions.map(quizdeck => {
      return (
        <div className="search-item">
          <a href={quizdeck.questions ? `/home/quiz/${quizdeck.id}` : `/home/deck/${quizdeck.id}`} className="search-link">
            <p>{quizdeck.title} {quizdeck.category}</p>
          </a>
        </div>
      )
    })
  }


  return(
    <div id="search-wrapper">
      <form id="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={changeHandler}
        />
      </form>
      <div id="search-list" >
        {searchValue.length > 0 ? mapQuizzesDecks() : null}
      </div>
    </div>
  )
}

const msp = (state) => {
  return{
    homeQuizzes: state.homeQuizzes,
    homeDecks: state.homeDecks
  }
}

export default connect(msp, null)(SearchForm)