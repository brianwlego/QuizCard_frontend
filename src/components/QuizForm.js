import React, { useState } from 'react'
import {connect} from 'react-redux'
import {createQuiz, editQuiz, deleteQuiz, addQuestion, editQuestion, deleteQuestion, finishCreateUpdateQuiz} from '../redux/actions'


function QuizForm(props){
  const [quizTitle, setQuizTitle] = useState("")
  const [quizCategory, setQuizCategory] = useState("")
  const [quizImg, setQuizImg] = useState("")
  const [photoURL, setPhotoURL] = useState("")

  const [editQuizContent, setEditQuizContent] = useState(false)

  const [questionContent, setQuestionContent] = useState("")
  const [questionNum, setQuestionNum] = useState(props.newQuestionArray.length > 0 ? props.newQuestionArray.length + 1 : 1)
  
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

  const [error, setError] = useState(false)

  const quizSubmitHandler = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    let formData = new FormData()
    formData.append('quiz[title]', quizTitle)
    formData.append('quiz[category]', quizCategory)
    if (editQuizContent){
      const quizId = props.newQuiz.id
      formData.append('newimg', quizImg)
      props.editQuiz(token, formData, quizId)
      setEditQuizContent(false)
    } else {
      formData.append('img', quizImg)
      props.createQuiz(token, formData)
    }
    setQuizImg("")
    setQuizTitle("")
    setQuizCategory("")
    setPhotoURL("")
  }
  const questionSubmitHandler = (e) => {
    const token = localStorage.getItem("token")
    e.preventDefault()
    if (answer === ""){
      setAnswer("one")
    }
    const choices = [
      {content: choiceOne, answer: answer === "one" ? true : false},
      {content: choiceTwo, answer: answer === "two" ? true : false},
      {content: choiceThree, answer: answer === "three" ? true : false},
      {content: choiceFour, answer: answer === "four" ? true : false}
    ]
    const newQuestion = {
      content: questionContent, num: questionNum, quiz_id: props.newQuiz.id, choices_attributes: choices
    }
    if (editQuestion === true){
      newQuestion.id = editQuestionId
      newQuestion.choices_attributes[0].id = editChoiceIdOne
      newQuestion.choices_attributes[1].id = editChoiceIdTwo
      newQuestion.choices_attributes[2].id = editChoiceIdThree
      newQuestion.choices_attributes[3].id = editChoiceIdFour
      props.editQuestion(token, newQuestion)
      setQuestionNum(props.newQuestionArray.length + 1)
    } else {
      props.addQuestion(token, newQuestion)
      setQuestionNum(questionNum + 1)
    }
    setQuestionContent("")
    setChoiceOne("")
    setChoiceTwo("")
    setChoiceThree("")
    setChoiceFour("")
    setAnswer("")
    setEditQuestion(false)
    setEditQuestionId("")
    setError(false)
  }
  const editHandler = (question) => {
    setEditQuestion(true)
    setEditQuestionId(question.id)
    setEditChoiceIdOne(question.choices[0].id)
    setEditChoiceIdTwo(question.choices[1].id)
    setEditChoiceIdThree(question.choices[2].id)
    setEditChoiceIdFour(question.choices[3].id)

    setQuestionContent(question.content)
    setQuestionNum(question.num)
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
    if (props.newQuestionArray.length > 0){
      setQuizTitle("")
      setQuizCategory("")
      setQuizImg("")
      setPhotoURL("")
      setEditQuizContent(false)
      setQuestionContent("")
      setChoiceOne("")
      setChoiceTwo("")
      setChoiceThree("")
      setChoiceFour("")
      setAnswer("")
      setEditQuestion(false)
      setEditQuestionId("")
      const quiz = props.newQuiz
      quiz.questions = props.newQuestionArray
      props.finishCreateUpdateQuiz(quiz)
      props.history.push('/profile')
    } else {
      setError(true)
    }
  }
  const renderQuestions = () => {
    return props.newQuestionArray.sort((a, b) => a.num - b.num).map(question => {
      return(
        <div className="question-nav" key={question.id} >
          <p>{question.content}</p>
          <div>
            <button onClick={()=>editHandler(question)} >Edit</button>
            <button onClick={()=>deleteHandler(question)} >Delete</button>
          </div>
        </div>
      )
    })
  }
  const handleFile = (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setQuizImg(file)
      setPhotoURL(fileReader.result)
    }
    if (file){
      fileReader.readAsDataURL(file)
    }
  }
  const renderQuizForm = () => {
    return (
      <form id="quiz-form" onSubmit={quizSubmitHandler} >
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
            id="quizfile"
            type="file"
            name="quizImg" 
            accept="image/*" 
            hidden
            onChange={(e)=>handleFile(e)}
          />
          <label id="form-file-button" for="quizfile">{props.newQuiz === "" ? "Select Quiz Image" : "Change Image" }</label>
          {photoURL !== "" ? <img id="photo-preview" src={photoURL} alt="" /> : props.newQuiz !== "" ? <img id="photo-preview" src={props.newQuiz.img_url} alt="" /> : null}
          <input type="submit" value={props.newQuiz === "" ? "Create Quiz" : "Update Quiz"}/>
        </form>
    )
  }
  const editQuiz = () => {
    setQuizTitle(props.newQuiz.title)
    setQuizCategory(props.newQuiz.category)
    setEditQuizContent(true)
  }
  const deleteQuiz = () => {
    const token = localStorage.getItem('token')
    props.deleteQuiz(token, props.newQuiz)
    props.history.push('/profile')
  }


  return(
    <div id="quiz-form-wrapper">
      {props.newQuiz !== "" ? 
        <>
        {editQuizContent ? 
          renderQuizForm() :
        <div id="quiz-form-content-wrapper" >
          {props.newQuiz.img_url === null ? null : 
            <img alt="" src={props.newQuiz.img_url} />
          }
          <div id="quiz-content">
            <h5>Title</h5>
            <h3>{props.newQuiz.title}</h3>
            <h5>Category</h5>
            <h3>{props.newQuiz.category}</h3>
            <div>
              <button onClick={()=>editQuiz()}>Edit</button>
              <button onClick={()=>deleteQuiz()} >Delete</button>
            </div>
          </div>
        </div>
        }
      <div id="questions" >
        {props.newQuestionArray.length > 0 ? renderQuestions() : null }
      </div>
      <div id="question-form-wrapper">
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
      <button onClick={finishQuiz}>Finish & Create Quiz</button>
      {error ? <p>Error. Quiz must have at least one question</p> : null}
      </div>
      </>
      : 
      <div id="new-quiz-form-wrapper">
        <h3>Create New Quiz</h3>
        <p>Start by inputing the Title and Category of your new quiz.</p>
        {renderQuizForm()}
      </div> }
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
    editQuiz: (token, quiz, quizId) => dispatch(editQuiz(token, quiz, quizId)),
    deleteQuiz: (token, quiz) => dispatch(deleteQuiz(token, quiz)),
    addQuestion: (token, newQuestion) => dispatch(addQuestion(token, newQuestion)),
    editQuestion: (token, question) => dispatch(editQuestion(token, question)), 
    deleteQuestion: (token, question) => dispatch(deleteQuestion(token, question)), 
    finishCreateUpdateQuiz: (quiz) => dispatch(finishCreateUpdateQuiz(quiz))
  }
}

export default connect(msp, mdp)(QuizForm)
