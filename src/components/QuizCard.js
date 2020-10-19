import React from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { deleteQuiz, populateQuizForm } from '../redux/actions'


function QuizCard (props) {

  const editHandler = () => {
    props.populateQuizForm(props.quiz)
    props.history.push('/profile/newquiz')
  }
  const deleteHandler = () => {
    const token = localStorage.getItem('token')
    props.deleteQuiz(token, props.quiz)
  }
  const clickHandler = (e) => {
    if (e.target.className === "edit"){
      editHandler()
    } else if (e.target.className === "delete"){
      deleteHandler()
    } else{
      props.history.push(`/home/quiz/${props.quiz.id}`)
    }
  }



  return (
    <div className="card-wrapper" onClick={clickHandler}>
      <h3 className="card-h3">Quiz</h3>
      <h3 className="card-title">{props.quiz.title}</h3>
      <div className="card-content-wrapper">
        <div className="left-content">
          <p>questions</p>
          <p>category</p>
          <p>made by</p>
        </div>
        <div className="right-content">
          <p>{props.quiz.questions.length}</p>
          <p>{props.quiz.category}</p>
          <p>{props.quiz.made_by}</p>
        </div>
      </div>
      {!props.profile ? null : 
        <div className="card-button-wrapper">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        </div>
      }
    </div>
  )
}

const msp = (state) => {
  return{
    newQuiz: state.newQuiz,
    newQuestionArray: state.newQuestionArray
  }
}
const mdp = (dispatch) => {
  return{
    deleteQuiz: (token, quiz) => dispatch(deleteQuiz(token, quiz)), 
    populateQuizForm: (quiz) => dispatch(populateQuizForm(quiz))
  }
}


export default connect(msp, mdp)(withRouter(QuizCard))