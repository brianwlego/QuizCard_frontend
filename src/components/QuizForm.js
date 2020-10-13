import React, { useState } from 'react'
import {connect} from 'react-redux'
import {createQuiz, addQuestion, editQuestion, deleteQuestion} from '../redux/actions'
import styled from 'styled-components'


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
      console.log("inside submit handler/edit", newQuestion)
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
      return(
        <QuestionNav key={props.newQuestionArray.indexOf(question)} >
          <p>{props.newQuestionArray.indexOf(question) + 1}</p>
          <div>
            <button onClick={()=>editHandler(question)} >Edit</button>
            <button onClick={()=>deleteHandler(question)} >Delete</button>
          </div>
        </QuestionNav>
      )
    })
  }



  return(
    <QuizFormWrapper>
      {props.newQuiz !== "" ? 
        <>
        <div id="quiz-content-wrapper" >
        {props.newQuiz.img_url === null ? null : 
          <img alt="" src={props.newQuiz.img_url} />
        }
        <NewQuizContent>
          <h5>Title</h5>
          <StyledTitle>{props.newQuiz.title}</StyledTitle>
          <h5>Category</h5>
          <StyledTitle>{props.newQuiz.category}</StyledTitle>
        </NewQuizContent>
      </div>
      <div id="questions" >
        {props.newQuestionArray.length > 0 ? renderQuestions() : null }
      </div>
      <form onSubmit={questionSubmitHandler} >
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
        <NewQuizForm onSubmit={quizSubmitHandler} >
          <NewQuizInputs 
            type="text"
            name="title"
            placeholder="Title..."
            value={quizTitle}
            onChange={(e)=> setQuizTitle(e.target.value)}
          />
          <NewQuizInputs 
            type="text"
            name="category"
            placeholder="Category..."
            value={quizCategory}
            onChange={(e)=> setQuizCategory(e.target.value)}
          />
          <NewQuizInputs
            type="file"
            name="quizImg" 
            accept="image/*" 
            onChange={(e)=>setQuizImg(e.target.files[0])}
          />
          <NewQuizInputs type="submit" value="Create Quiz"/>
        </NewQuizForm>
      </> }
    </QuizFormWrapper>
  )
}
const QuizFormWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
`
const NewQuizForm = styled.form` 
  display: flex;
  flex-direction: column;
  align-items:center;
`
const NewQuizInputs = styled.input` 
  padding: 10px;
`
const NewQuizContent = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 4%;
`
const StyledTitle = styled.h3`
  margin: 5px 0;
  text-align: center;
`
const QuestionNav = styled.div` 
  border: 1px solid black;
  max-width: 8em;
  height: auto;
`

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
