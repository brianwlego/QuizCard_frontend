import React, { useState, useEffect } from 'react'
import Choice from './Choice'
import {connect} from 'react-redux'
import {addFav, removeFav, addScore, resetQuizScore} from '../redux/actions'



function QuizShow(props){
  const [quiz, setQuiz] = useState({})
  const [questions, setQuestions] = useState([])
  const [scores, setScores] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState(props.quizScore !== "" ? props.quizScore.right.concat(props.quizScore.wrong) : [])
  const [questionNum, setQuestionNum] = useState(0)
  const [questionNumArray, setQuestionNumArray] = useState([])

  const [viewQuiz, setViewQuiz] = useState(props.quizScore !== "" ? true : false)

  const [favQuiz, setFavQuiz] = useState(false)

  const [right, setRight] = useState(props.quizScore !== "" ? props.quizScore.right : [])
  const [wrong, setWrong] = useState(props.quizScore !== "" ? props.quizScore.wrong : [])
  const [chosen, setChosen] = useState(props.quizScore !== "" ? props.quizScore.chosen : [])

  const [showNewScore, setShowNewScore] = useState(false)

  useEffect(()=>{
    const quizId = window.location.pathname.split('/')[3]
    const token = localStorage.getItem('token')
    fetch(`https://quizcard-backend.herokuapp.com/api/v1/quizzes/${quizId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    .then(resp=>resp.json())
    .then(data => {
      let x = []
      for (let i=0; i<data.quiz.questions.length; i++) {
        x.push(i);
      }
      setQuestionNumArray(x)
      if(data.fav_quiz !== null){
        setFavQuiz(data.fav_quiz)
      }
      setQuiz(data.quiz)
      setQuestions(data.quiz.questions)
      setScores(data.quiz.scores)
    })
  }, [])

  const handleClick = (choice) => {
    setAnsweredQuestions([...answeredQuestions, questionNum])
    setChosen([...chosen, choice.id])
    if (choice.answer){
      setRight([...right, questionNum])
    } else {
      setWrong([...wrong, questionNum])
    }
    if (questions.length - 1 === answeredQuestions.length){
      setShowNewScore(true)
      setViewQuiz(true)
    }
  }
  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  const renderChoices = () => {
    const num = questionNumArray[questionNum]
    const choices = quiz.questions[num].choices
    return shuffle(choices).map(choice => <Choice key={choice.id} choice={choice} handleClick={handleClick} chosen="" styling='choice-wrapper'/> )
  }
  const renderAnswerChoices = () => {
    const num = questionNumArray[questionNum]
    return quiz.questions[num].choices.map(choice => {
      return <Choice key={choice.id} choice={choice} handleClick={""} styling={choice.answer ? "right-answer" : "wrong-answer"} chosen={chosen.includes(choice.id) ? "chosen" : ""} /> })
  }
  const next = () => {
    if(questionNum <= quiz.questions.length - 2){
      const show = document.getElementById('quiz-show-content')
      show.className = "animate__animated animate__fadeOutLeft"
      show.addEventListener('animationend', () => {
        show.className = "animate__animated animate__fadeInRight"
        setQuestionNum(questionNum + 1)
      });
    }
  }
  const previous = () => {
    if (questionNum >= 1){
      const show = document.getElementById('quiz-show-content')
      show.className = "animate__animated animate__fadeOutRight"
      show.addEventListener('animationend', () => {
        show.className = "animate__fadeInLeft animate__animated"
        setQuestionNum(questionNum - 1)
      });
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
      fetch(`https://quizcard-backend.herokuapp.com/v1/quizzes/${quiz.id}/favorite`, configObj)
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
      fetch(`https://quizcard-backend.herokuapp.com/api/v1/quizzes/${quiz.id}/unfavorite`, configObj)
      .then(resp=>resp.json())
      .then(data => {
        if(data.success){
          setFavQuiz(false)
          props.removeFav(quiz)
        }
      })
    }
  }
  const recordScore = (score) => {
    const configObj = {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({score: {
        quiz_id: quiz.id,
        percent: score,
        right: right.toString(),
        wrong: wrong.toString(),
        chosen: chosen.toString()
      }})
    }
    fetch(`https://quizcard-backend.herokuapp.com/api/v1/quizzes/${quiz.id}/createscore`, configObj)
    .then(resp=>resp.json())
    .then(data => {
      setScores([data.score, ...scores])
      setShowNewScore(false)
      props.addScore(data.score)
    })
  }
  const resetQuiz = () => {
    setAnsweredQuestions([])
    setQuestionNum(0)
    setRight([])
    setWrong([])
    setChosen([])
    setShowNewScore(false)
    setViewQuiz(false)
  }
  const renderNewScore = () => {
    const score = (right.length / questions.length) * 100
    return(
        <div id="score-content">
          <h3>Score: {score.toFixed(2)}%</h3>
          <div id="score-button-wrapper">
            <button onClick={()=>recordScore(score)}>Record Score?</button>
            <button onClick={()=>resetQuiz()}>Retake Quiz</button>
          </div>
        </div>
    )
  }
  const renderScores = () => {
    const sortedScores = scores.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
    return(
      <div id="quiz-scores">
        <h4>Previous Scores</h4>
        <div id="score-list">
          {sortedScores.map(score => {
            return(
              <div className="profile-score-card" onClick={()=>showPreviousQuiz(score)}>
                <div className="left-score-content">
                  <p>user</p>
                  <p>percent</p>
                  <p>date</p>
                </div>
                <div className="right-score-content">
                  <p>{score.user_name}</p>
                  <p>{score.percent}%</p>
                  <p>{score.date}</p>
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
  const showPreviousQuiz = (score) => {
    setViewQuiz(true)
    setAnsweredQuestions(score.right.concat(score.wrong))
    setQuestionNum(0)
    setRight(score.right)
    setWrong(score.wrong)
    setChosen(score.chosen)
  }
  const closeButton = () => {
    resetQuiz()
    setViewQuiz(false)
    props.resetQuizScore()
  }
  const shuffleQuestions = () => {
    const a = [...questionNumArray]
    const newArray = shuffle(a)
    setViewQuiz(false)
    setQuestionNumArray(newArray)
    setAnsweredQuestions([])
    setQuestionNum(0)
  }

  let num = questionNumArray[questionNum]



  return(
    <>
      {quiz.questions !== undefined ? 
      <div className="quiz-wrapper">
        <div id="quiz-content-wrapper">
          {quiz.img_url !== null ? <img alt="" src={quiz.img_url}/> : null}
          <div id="cat-title-wrapper">
            <h3>Category</h3>
            <h4>{quiz.category}</h4>
            <h3>Title</h3>
            <h4>{quiz.title}</h4>
          </div>
          <div id="score-list-wrapper">
            <button onClick={favHandler} id="fav-button" >{!favQuiz ? "Add This Quiz To Your Favorites" : "Remove This Quiz From Favorites"}</button>
            {!viewQuiz ? <button onClick={()=>shuffleQuestions()} >Shuffle Questions</button> : null}
          {showNewScore ? renderNewScore() : scores.length > 0 ? renderScores() :  <div id="quiz-scores">
                  <h4 id="no-scores">There aren't any recorded scores for this quiz</h4>
                </div>}
          </div>
        </div> 
        <div id="quiz-show-wrapper">
            <div id="quiz-show-content">
              {viewQuiz ? <button id="close-button" onClick={()=>closeButton()}>&#10005;</button> : null}
              {questions.length > 0 ? <h4>{questions[num].content}</h4> : null }
              {answeredQuestions.includes(questionNum) ? renderAnswerChoices() : renderChoices()}
            </div>
          <div className="quiz-buttons-wrapper" >
            <button
              onClick={previous}
              id={questionNum !== 0 ? null : 'disabled'}
            >previous</button>
            <p>{questionNum + 1}/{quiz.questions.length}</p>
            <button
              onClick={next}
              id={questionNum === questions.length - 1 ? 'disabled' : null}
            >next</button>
          </div>
        </div>
      </div>
      : 
      <div className="quiz-wrapper" >
        Loading...
      </div> }
    </>
  )
}

const msp = (state) => {
  return {
    quizScore: state.quizScore,
  }
}

const mdp = (dispatch) => {
  return {
    addFav: (newFav) => dispatch(addFav(newFav)),
    removeFav: (fav) => dispatch(removeFav(fav)),
    addScore: (score) => dispatch(addScore(score)),
    resetQuizScore: () => dispatch(resetQuizScore())
  }
}

export default connect(msp, mdp)(QuizShow)