export default (state = {
  user: "",
  signup: false,
  homeDecks: [], 
  homeQuizzes: [],
  userCreations: [],
  userFavs: [],
  newDeck: "",
  newQuiz: "",
  newQuestionArray: [],

}, action) => {
  switch(action.type){
    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
        signup: false
      }
    case 'SET_SIGNUP':
      return{
        ...state,
        signup: !state.signup
      }
    case 'POPULATE_HOME':
      return{
        ...state,
        homeDecks: action.payload.homeDecks,
        homeQuizzes: action.payload.homeQuizzes
      }
    case 'POPULATE_PROFILE':
      return{
        ...state,
        userCreations: action.payload.userCreations, 
        userFavs: action.payload.userFavs
      } 
    case 'NEW_DECK':
      return{
        ...state,
        newDeck: action.payload
      }
    case 'NEW_QUIZ':
      return{
        ...state,
        newQuiz: action.payload
      }
    case 'NEW_QUESTION':
      return{
        ...state,
        newQuestionArray: [...state.newQuestionArray, action.payload]
      }
    case 'EDIT_QUESTION':
      let editArray = [...state.newQuestionArray].filter(question => question.id !== action.payload.id)
      editArray.push(action.payload)
      return{
        ...state,
        newQuestionArray: editArray
      }
    case 'DELETE_QUESTION':
      const deleteArray = [...state.newQuestionArray].filter(question => question.id !== action.payload)
      return{
        ...state,
        newQuestionArray: deleteArray
      }
    
    default:
      return state
  }
}