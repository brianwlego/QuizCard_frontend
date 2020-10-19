export default (state = {
  user: "",
  error: "",
  signup: false,
  homeDecks: [], 
  homeQuizzes: [],
  userCreations: [],
  userFavs: [],
  userScores: [],
  newDeck: "",
  newCardArray: [],
  newQuiz: "",
  newQuestionArray: [],
  quizScore: "",

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
        userFavs: action.payload.userFavs,
        userScores: action.payload.userScores
      } 
    case 'NEW_DECK':
      return{
        ...state,
        newDeck: action.payload
      }
    case 'EDIT_DECK':
      const editDeckArray = [...state.userCreations].filter(deck=>deck.id !== action.payload.id)
      editDeckArray.unshift(action.payload)
      return{
        ...state, 
        newDeck: action.payload,
        userCreations: editDeckArray
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
    case 'FINISH_DECK':
      const finishDeckFavArray = [...state.userFavs]
      const foundIdxDeck = state.userFavs.findIndex(deck=> deck.id === action.payload.id)
      if (foundIdxDeck !== -1){
        finishDeckFavArray.splice(foundIdxDeck, 1, action.payload)
      }
      return{
        ...state,
        homeDecks: [...state.homeDecks, action.payload],
        userCreations: [action.payload, ...state.userCreations],
        userFavs: finishDeckFavArray
      }
    case 'NEW_QUIZ':
      return{
        ...state,
        newQuiz: action.payload, 
        userCreations: [...state.userCreations, action.payload],
        homeQuizzes: [...state.homeQuizzes, action.payload]
      }
    case 'EDIT_QUIZ':
      const editQuizArray = [...state.userCreations].filter(quiz=>quiz.id !== action.payload.id)
      editQuizArray.unshift(action.payload)
      return{
        ...state,
        newQuiz: action.payload,
        userCreations: editQuizArray,

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
      const dltidx = state.userFavs.indexOf(action.payload)
      const newUserFavs = [...state.userFavs]
      if (dltidx){
        newUserFavs.filter(quiz=> quiz.id !== action.payload.id)
      }
      return{
        ...state,
        userCreations: newUserCreationsArray,
        homeQuizzes: newHomeQuizzes,
        userFavs: newUserFavs
      }
    case 'POPULATE_QUIZ_FORM':
      return{
        ...state,
        newQuiz: action.payload,
        newQuestionArray: action.payload.questions
      }
    case 'POPULATE_QUIZ_SCORE':
      return{
        ...state,
        quizScore: action.payload
      }  
    case 'RESET_QUIZ_SCORE':
      return{
        ...state, 
        quizScore: ""
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
    case 'ADD_SCORE':
      return{
        ...state,
        userScores: [...state.userScores, action.payload]
      }    
    
    default:
      return state
  }
}