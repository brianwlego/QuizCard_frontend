import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Choice from './Choice'


function QuizShow(){
  const [quiz, setQuiz] = useState({})
  const [questionNum, setQuestionNum] = useState(0)
  const [clicked, setClicked] = useState(false)

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
    .then(data => setQuiz(data.quiz))
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


  return(
    <div id="quiz-show-wrapper" >
      {quiz.questions !== undefined ? 
      <QuizWrapper>
        <h3>Category: {quiz.category}</h3>
        <h4>Title: {quiz.title}</h4>
        <Content>
          <h4>{quiz.questions[questionNum].content}</h4>
          {clicked ? renderAnswerChoices() : renderChoices()}
        </Content>
        <div id="buttons-wrapper" >
          <button
            onClick={previous}
          >previous</button>
          <button
            onClick={next}
          >next</button>
        </div>
      </QuizWrapper>
      : 
      <QuizWrapper>
        Loading...
      </QuizWrapper> }
    </div>
  )
}

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 3%;
  padding: 2em;
`

export default QuizShow