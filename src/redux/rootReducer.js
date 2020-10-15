export default (state = {
  user: "",
  error: "",
  signup: false,
  homeDecks: [], 
  homeQuizzes: [],
  userCreations: [],
  userFavs: [],
  newDeck: "",
  newCardArray: [],
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
    case 'ERROR':
      return{
        ...state,
        error: action.payload
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
    case 'ADD_CARD':
      return{
        ...state, 
        newCardArray: [...state.newCardArray, action.payload]
      }
    case 'EDIT_CARD':
      let editCardArray = [...state.newCardArray].filter(card => card.id !== action.payload.id)
      editCardArray.push(action.payload)
      return{
        ...state,
        newCardArray: editCardArray
      }
    case 'DELETE_CARD':
      const deleteCardArray = [...state.newCardArray].filter(card => card.id !== action.payload)
      return{
        ...state,
        newCardArray: deleteCardArray
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
    case 'DELETE_QUIZ':
      const idx = state.userCreations.indexOf(action.payload)
      const newUserCreationsArray = [...state.userCreations]
      newUserCreationsArray.splice(idx, 1)
      const newHomeQuizzes = [...state.homeQuizzes].filter(quiz=> quiz.id !== action.payload.id)
      return{
        ...state,
        userCreations: newUserCreationsArray,
        homeQuizzes: newHomeQuizzes
      }
    case 'POPULATE_QUIZ_FORM':
      return{
        ...state,
        newQuiz: action.payload,
        newQuestionArray: action.payload.questions
      }
    case 'DELETE_DECK':
      const deckIdx = state.userCreations.indexOf(action.payload)
      const deleteDeckArray = [...state.userCreations]
      deleteDeckArray.splice(deckIdx, 1)
      const newHomeDecks = [...state.homeDecks].filter(deck=> deck.id !== action.payload.id)
      return{
        ...state,
        userCreations: deleteDeckArray,
        homeDecks: newHomeDecks
      }
    case 'POPULATE_DECK_FORM':
      return{
        ...state,
        newDeck: action.payload,
        newCardArray: action.payload.cards
      }
    case 'FAVORITE':
      return{
        ...state, 
        userFavs: [...state.userFavs, action.payload]
      }
    case 'UNFAVORITE':
      const favIndex = state.userFavs.indexOf(action.payload)
      const newUsersFavArray = [...state.userFavs]
      newUsersFavArray.splice(favIndex, 1)
      return{
        ...state,
        userFavs: newUsersFavArray
      }  
    
    default:
      return state
  }
}