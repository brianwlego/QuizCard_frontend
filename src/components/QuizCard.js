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



  return (
    <div className="card-wrapper">
      <a href={`/home/quiz/${props.quiz.id}`} >
      <h3>Quiz: {props.quiz.title}</h3>
      <div className="middle-wrapper">
        <div className="inner-wrapper" >
          <p>Questions</p>
          <p>{props.quiz.questions.length}</p>
        </div >
        <div className="inner-wrapper">
          <p>Category</p>
          <p>{props.quiz.category}</p>
        </div >
      </div>
      <p>Made By: {props.quiz.made_by}</p>
      </a>
      {!props.profile ? null : 
        <div>
          <button onClick={()=>editHandler()}>Edit</button>
          <button onClick={()=>deleteHandler()}>Delete</button>
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