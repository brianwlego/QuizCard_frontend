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
        <a href={quizdeck.questions ? `/home/quiz/${quizdeck.id}` : `/home/deck/${quizdeck.id}`} className="search-item">
          <li>
            {quizdeck.title} {quizdeck.category}
          </li>
        </a>
      )
    })
  }


  return(
    <div id="searh-wrapper">
      <form id="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={changeHandler}
        />
      </form>
      <ul id="search-list" >
        {searchValue.length > 0 ? mapQuizzesDecks() : null}
      </ul>
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