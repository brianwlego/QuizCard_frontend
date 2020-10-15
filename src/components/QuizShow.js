import React, { useState, useEffect } from 'react'
import Choice from './Choice'
import {connect} from 'react-redux'
import {addFav, removeFav} from '../redux/actions'


function QuizShow(props){
  const [quiz, setQuiz] = useState({})
  const [questionNum, setQuestionNum] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [favQuiz, setFavQuiz] = useState(false)

  useEffect(()=>{
    const quizId = window.location.pathname.split('/')[3]
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/api/v1/quizzes/${quizId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    .then(resp=>resp.json())
    .then(data => {
      if(data.fav_quiz !== null){
        setFavQuiz(data.fav_quiz)
      }
      setQuiz(data.quiz)
    })
  }, [])

  const handleClick = () => {
    if (!clicked){
      setClicked(true)
    } 
  }

  const renderChoices = () => {
    return quiz.questions[questionNum].choices.map(choice => <Choice key={choice.id} choice={choice} handleClick={handleClick} color={"lightgrey"}/> )
  }
  const renderAnswerChoices = () => {
    return quiz.questions[questionNum].choices.map(choice => <Choice key={choice.id} choice={choice} handleClick={handleClick} color={choice.answer ? "lightgreen" : "red"}/> )
  }

  const next = () => {
    if(questionNum <= quiz.questions.length - 2){
      setQuestionNum(questionNum + 1)
      setClicked(false)
    }
  }
  const previous = () => {
    if (questionNum >= 1){
      setQuestionNum(questionNum - 1)
      setClicked(false)
    }
  }

  const favHandler = () => {
    const token = localStorage.getItem('token')
    if (!favQuiz){
      const configObj = {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
        }
      }
      fetch(`http://localhost:3000/api/v1/quizzes/${quiz.id}/favorite`, configObj)
      .then(resp=>resp.json())
      .then(data => {
        setFavQuiz(data.fav_quiz)
        props.addFav(quiz)
      })
    } else {
      const configObj = {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
        }
      }
      fetch(`http://localhost:3000/api/v1/quizzes/${quiz.id}/unfavorite`, configObj)
      .then(resp=>resp.json())
      .then(data => {
        if(data.success){
          setFavQuiz(false)
          props.removeFav(quiz)
        }
      })
    }
  }



  return(
    <>
      {quiz.questions !== undefined ? 
      <div className="quiz-wrapper">
        <h3>Category: {quiz.category}</h3>
        <h4>Title: {quiz.title}</h4>
        <div id="quiz-show-content">
          <h4>{quiz.questions[questionNum].content}</h4>
          {clicked ? renderAnswerChoices() : renderChoices()}
        </div>
        <div id="buttons-wrapper" >
          <button
            onClick={previous}
          >previous</button>
          <button
            onClick={next}
          >next</button>
        </div>
        <button onClick={favHandler}>{!favQuiz ? "Add This Quiz To Your Favorites" : "Remove This Quiz From Favorites"}</button>
      </div>
      : 
      <div className="quiz-wrapper" >
        Loading...
      </div> }
    </>
  )
}



const mdp = (dispatch) => {
  return {
    addFav: (newFav) => dispatch(addFav(newFav)),
    removeFav: (fav) => dispatch(removeFav(fav))
  }
}

export default connect(null, mdp)(QuizShow)