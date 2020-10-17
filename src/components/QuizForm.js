import React, { useState } from 'react'
import {connect} from 'react-redux'
import {createQuiz, addQuestion, editQuestion, deleteQuestion} from '../redux/actions'


function QuizForm(props){
  const [quizTitle, setQuizTitle] = useState("")
  const [quizCategory, setQuizCategory] = useState("")
  const [quizImg, setQuizImg] = useState("")

  const [questionContent, setQuestionContent] = useState("")
  
  const [choiceOne, setChoiceOne] = useState("")
  const [choiceTwo, setChoiceTwo] = useState("")
  const [choiceThree, setChoiceThree] = useState("")
  const [choiceFour, setChoiceFour] = useState("")
  const [answer, setAnswer] = useState("")

  const [editQuestion, setEditQuestion] = useState(false)
  const [editQuestionId, setEditQuestionId] = useState("")
  const [editChoiceIdOne, setEditChoiceIdOne] = useState("")
  const [editChoiceIdTwo, setEditChoiceIdTwo] = useState("")
  const [editChoiceIdThree, setEditChoiceIdThree] = useState("")
  const [editChoiceIdFour, setEditChoiceIdFour] = useState("")

  const quizSubmitHandler = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    let formData = new FormData()
    formData.append('quiz[title]', quizTitle)
    formData.append('quiz[category]', quizCategory)
    formData.append('img', quizImg)

    props.createQuiz(token, formData)
    setQuizImg("")
    setQuizTitle("")
    setQuizCategory("")
  }

  const questionSubmitHandler = (e) => {
    const token = localStorage.getItem("token")
    e.preventDefault()
    const choices = [
      {content: choiceOne, answer: answer === "one" ? true : false},
      {content: choiceTwo, answer: answer === "two" ? true : false},
      {content: choiceThree, answer: answer === "three" ? true : false},
      {content: choiceFour, answer: answer === "four" ? true : false}
    ]
    const newQuestion = {
      content: questionContent, quiz_id: props.newQuiz.id, choices_attributes: choices
    }
    if (editQuestion === true){
      newQuestion.id = editQuestionId
      newQuestion.choices_attributes[0].id = editChoiceIdOne
      newQuestion.choices_attributes[1].id = editChoiceIdTwo
      newQuestion.choices_attributes[2].id = editChoiceIdThree
      newQuestion.choices_attributes[3].id = editChoiceIdFour
      props.editQuestion(token, newQuestion)
    } else {
      props.addQuestion(token, newQuestion)
    }
    setQuestionContent("")
    setChoiceOne("")
    setChoiceTwo("")
    setChoiceThree("")
    setChoiceFour("")
    setAnswer("")
    setEditQuestion(false)
    setEditQuestionId("")
  }

  const editHandler = (question) => {
    setEditQuestion(true)
    setEditQuestionId(question.id)
    setEditChoiceIdOne(question.choices[0].id)
    setEditChoiceIdTwo(question.choices[1].id)
    setEditChoiceIdThree(question.choices[2].id)
    setEditChoiceIdFour(question.choices[3].id)

    setQuestionContent(question.content)
    setChoiceOne(question.choices[0].content)
    setChoiceTwo(question.choices[1].content)
    setChoiceThree(question.choices[2].content)
    setChoiceFour(question.choices[3].content)
    setAnswer(question.choices[0].answer ? "one" : question.choices[1].answer ? "two" : question.choices[2].answer ? "three" : question.choices[3].answer ? "four" : "")
  }
  const deleteHandler = (question) => {
    const token = localStorage.getItem("token")
    props.deleteQuestion(token, question)
    setQuestionContent("")
    setChoiceOne("")
    setChoiceTwo("")
    setChoiceThree("")
    setChoiceFour("")
  }
  const finishQuiz = () => {
    props.history.push('/profile')
  }

  const renderQuestions = () => {
    return props.newQuestionArray.map(question => {
      const index = props.newQuestionArray.indexOf(question) + 1
      return(
        <div className="question-nav" key={index} >
          <p>{question.content}</p>
          <div>
            <button onClick={()=>editHandler(question)} >Edit</button>
            <button onClick={()=>deleteHandler(question)} >Delete</button>
          </div>
        </div>
      )
    })
  }



  return(
    <div id="quiz-form-wrapper">
      {props.newQuiz !== "" ? 
        <>
        <div id="quiz-content-wrapper" >
        {props.newQuiz.img_url === null ? null : 
          <img alt="" src={props.newQuiz.img_url} />
        }
        <div id="quiz-content">
          <h5>Title</h5>
          <h3>{props.newQuiz.title}</h3>
          <h5>Category</h5>
          <h3>{props.newQuiz.category}</h3>
        </div>
      </div>
      <div id="questions" >
        {props.newQuestionArray.length > 0 ? renderQuestions() : null }
      </div>
      <form onSubmit={questionSubmitHandler} id="question-form">
        <input 
          type="text"
          name="question-content"
          placeholder="Question..."
          value={questionContent}
          onChange={(e)=>setQuestionContent(e.target.value)}
        />
        <input 
          type="text"
          name="choice-one"
          placeholder="Choice One..."
          value={choiceOne}
          onChange={(e)=>setChoiceOne(e.target.value)}
        />
        <input 
          type="text"
          name="choice-two"
          placeholder="Choice Two..."
          value={choiceTwo}
          onChange={(e)=>setChoiceTwo(e.target.value)}
        />
        <input 
          type="text"
          name="choice-three"
          placeholder="Choice Three..."
          value={choiceThree}
          onChange={(e)=>setChoiceThree(e.target.value)}
        />
        <input 
          type="text"
          name="choice-four"
          placeholder="Choice Four..."
          value={choiceFour}
          onChange={(e)=>setChoiceFour(e.target.value)}
        />
        <p>Select the choice that is the correct answer:</p>
        <select name="answer" value={answer} onChange={(e)=>setAnswer(e.target.value)}>
          <option value="one">Choice One</option>
          <option value="two">Choice Two</option>
          <option value="three">Choice Three</option>
          <option value="four">Choice Four</option>
        </select>
        <input type="submit" value="Submit Question" />
      </form>
      <button onClick={finishQuiz}>Finish & Create New Quiz</button>
      </>
      : 
      <>
        <h3>Create New Quiz</h3>
        <p>Start by inputing the Title and Category of your new quiz.</p>
        <div id="quiz-form" onSubmit={quizSubmitHandler} >
          <input 
            type="text"
            name="title"
            placeholder="Title..."
            value={quizTitle}
            onChange={(e)=> setQuizTitle(e.target.value)}
          />
          <input 
            type="text"
            name="category"
            placeholder="Category..."
            value={quizCategory}
            onChange={(e)=> setQuizCategory(e.target.value)}
          />
          <input
            type="file"
            name="quizImg" 
            accept="image/*" 
            onChange={(e)=>setQuizImg(e.target.files[0])}
          />
          <input type="submit" value="Create Quiz"/>
        </div>
      </> }
    </div>
  )
}


const msp = (state) => {
  return {
    newQuiz: state.newQuiz,
    newQuestionArray: state.newQuestionArray
  }
}
const mdp = (dispatch) => {
  return {
    createQuiz: (token, newQuiz) => dispatch(createQuiz(token, newQuiz)),
    addQuestion: (token, newQuestion) => dispatch(addQuestion(token, newQuestion)),
    editQuestion: (token, question) => dispatch(editQuestion(token, question)), 
    deleteQuestion: (token, question) => dispatch(deleteQuestion(token, question))
  }
}

export default connect(msp, mdp)(QuizForm)
