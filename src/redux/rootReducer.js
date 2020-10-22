export default (state = {
  user: "",
  errors: [],
  signup: false,
  skinnyDecks: [],
  skinnyQuizzes: [],
  homeDecks: [],
  homeDeckMeta: {}, 
  homeQuizzes: [],
  homeQuizMeta: {},
  populatedProfile: false,
  populatedHome: false,
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
        signup: false,
        errors: []
      }
    case 'ERRORS':
      return{
        ...state,
        errors: action.payload
      }  
    case 'SET_SIGNUP':
      return{
        ...state,
        signup: !state.signup
      }
    case 'POPULATE_BROWSE':
      return{
        ...state,
        skinnyDecks: action.payload.decks,
        skinnyQuizzes: action.payload.quizzes
      }
    case 'POPULATE_HOME_DECKS':
      return{
        ...state,
        homeDecks: action.payload.homeDecks,
        homeDeckMeta: action.payload.meta
      }
    case 'POPULATE_HOME_QUIZZES':
      return{
        ...state,
        homeQuizzes: action.payload.homeQuizzes,
        homeQuizMeta: action.payload.meta,
        populatedHome: true
      } 
    case 'ADD_HOME_QUIZZES':  
      return{
        ...state,
        homeQuizzes: [...state.homeQuizzes, action.payload.homeQuizzes].flat(),
        homeQuizMeta: action.payload.meta
      }
    case 'ADD_HOME_DECKS':  
    return{
      ...state,
      homeDecks: [...state.homeDecks, action.payload.homeDecks].flat(),
      homeDeckMeta: action.payload.meta
    }
    case 'POPULATE_PROFILE':
      let uC = []
      let uF = []
      let uS = []
      if (action.payload.userCreations !== undefined){
        uC = action.payload.userCreations
      }
      if (action.payload.userFavs !== undefined){
        uF = action.payload.userFavs
      }
      if (action.payload.userScores !== undefined){
        uS = action.payload.userScores
      }
      return{
        ...state,
        userCreations: uC, 
        userFavs: uF,
        userScores: uS, 
        populatedProfile: true
      } 
    case 'NEW_DECK':
      return{
        ...state,
        newDeck: action.payload
      }
    case 'EDIT_DECK':
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
      const editCardArray = [...state.newCardArray].filter(card => card.id !== action.payload.id)
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
      //USER CREATION STATE//
      const idxDeck = state.userCreations.indexOf(action.payload)
      const editUserCreationArray = [...state.userCreations]
      if(idxDeck !== -1){
        editUserCreationArray.splice(idxDeck, 1)
        editUserCreationArray.unshift(action.payload)
      } else {
        editUserCreationArray.unshift(action.payload)
      }
      //HOME DECK STATE//
      const editHomeDecksArray = [...state.homeDecks].filter(deck => deck.id !== action.payload.id)
      editHomeDecksArray.unshift(action.payload)
      //SKINNY DECK STATE//
      const editSkinnyDecksArray = [...state.skinnyDecks].filter(deck => deck.id !== action.payload.id)
      let newObj = {id: action.payload.id, category: action.payload.category, title: action.payload.title }
      editSkinnyDecksArray.unshift(newObj)
      //USER FAVS//
      const editUserFavs = [...state.userFavs]
      const foundIdxDeck = state.userFavs.findIndex(ele => ele.id === action.payload.id && ele.cards)
      if (foundIdxDeck !== -1){
        editUserFavs.splice(foundIdxDeck, 1, action.payload)
      }

      return{
        ...state,
        homeDecks: editHomeDecksArray,
        userCreations: editUserCreationArray,
        skinnyDecks: editSkinnyDecksArray,
        userFavs: editUserFavs,
        newDeck: "", 
        newCardArray: []
      }
    case 'NEW_QUIZ':
      return{
        ...state,
        newQuiz: action.payload
      }
    case 'EDIT_QUIZ':
      return{
        ...state,
        newQuiz: action.payload
      }
    case 'NEW_QUESTION':
      const addQuestionUserScores = [...state.userScores].filter(score => score.quiz_id !== action.payload.quiz_id)
      return{
        ...state,
        newQuestionArray: [...state.newQuestionArray, action.payload],
        userScores: addQuestionUserScores
      }
    case 'EDIT_QUESTION':
      const editQuestionArray = [...state.newQuestionArray].filter(question => question.id !== action.payload.id)
      editQuestionArray.push(action.payload)
      //USER SCORES//
      const editQuestionUserScores = [...state.userScores].filter(score => score.quiz_id !== action.payload.quiz_id)
      return{
        ...state,
        newQuestionArray: editQuestionArray,
        userScores: editQuestionUserScores
      }
    case 'DELETE_QUESTION':
      const deleteArray = [...state.newQuestionArray].filter(question => question.id !== action.payload)
      //USER SCORES//
      const deleteQuestionUserScores = [...state.userScores].filter(score => score.quiz_id !== action.payload.quiz_id)
      return{
        ...state,
        newQuestionArray: deleteArray,
        userScores: deleteQuestionUserScores
      }
    case 'DELETE_QUIZ':
      //USER CREATIONS//
      const idx = state.userCreations.findIndex(ele => ele.id === action.payload.id && ele.questions)
      const newUserCreationsArray = [...state.userCreations]
      newUserCreationsArray.splice(idx, 1)
      //HOME QUIZZES//
      let newHomeQuizzes = [...state.homeQuizzes].filter(quiz=> quiz.id !== action.payload.id)
      //SKINNY QUIZZES//
      const deleteSkinnyQuizzes = [...state.skinnyQuizzes].filter(quiz => quiz.id !== action.payload.id)
      //USER FAVS//
      const dltidx = state.userFavs.findIndex(ele => ele.id === action.payload.id && ele.questions)
      const newUserFavs = [...state.userFavs]
      if (dltidx !== -1){
        newUserFavs.splice(dltidx, 1)
      }
      //USER SCORES//
      const deleteQuizUserScores = [...state.userScores].filter(score => score.quiz_id !== action.payload.id)
      return{
        ...state,
        userCreations: newUserCreationsArray,
        homeQuizzes: newHomeQuizzes,
        skinnyQuizzes: deleteSkinnyQuizzes,
        userFavs: newUserFavs,
        userScores: deleteQuizUserScores
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
      //USER CREATION STATE//
      const idxDelete = state.userCreations.findIndex(ele => ele.id === action.payload.id && ele.cards)
      const newUserDeleteCreationsArray = [...state.userCreations]
      if (idxDelete !== -1){
        newUserDeleteCreationsArray.splice(idxDelete, 1)
      }
      //HOME DECKS STATE//
      const newHomeDecks = [...state.homeDecks].filter(deck=> deck.id !== action.payload.id)
      //SKINNY DECK STATE//
      const newSkinnyDecks = [...state.skinnyDecks].filter(deck => deck.id !== action.payload.id)
      //USER FAVS STATE//
      const index = state.userFavs.findIndex(ele => ele.id === action.payload.id && ele.cards)
      const newUserDeleteFavs = [...state.userFavs]
      if (index !== -1){
        newUserDeleteFavs.splice(index, 1)
      }

      return{
        ...state,
        userCreations: newUserDeleteCreationsArray,
        homeDecks: newHomeDecks,
        skinnyDecks: newSkinnyDecks,
        userFavs: newUserDeleteFavs
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
        userFavs: [action.payload, ...state.userFavs]
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
    case 'FINISH_QUIZ':
      //USER CREATIONS//
      const newidx = state.userCreations.indexOf(action.payload)
      const newQuizUserCreationsArray = [...state.userCreations]
      newQuizUserCreationsArray.splice(newidx, 1, action.payload)
      //HOME QUIZZES//
      const editHomeQuizzesArray = [...state.homeQuizzes].filter(quiz => quiz.id !== action.payload.id)
      editHomeQuizzesArray.unshift(action.payload)
      //SKINNY QUIZZES//
      const editSkinnyQuizzesArray = [...state.skinnyQuizzes].filter(quiz => quiz.id !== action.payload.id)
      let newQuizObj = {id: action.payload.id, category: action.payload.category, title: action.payload.title }
      editSkinnyQuizzesArray.unshift(newQuizObj)
      //USER FAVS//
      const editQuizUserFavs = [...state.userFavs]
      const foundIdxQuiz = state.userFavs.indexOf(action.payload)
      if (foundIdxQuiz !== -1){
        editQuizUserFavs.splice(foundIdxQuiz, 1, action.payload)
      }

      return{
        ...state,
        newQuiz: "",
        newQuestionArray: [],
        userCreations: newQuizUserCreationsArray,
        homeQuizzes: editHomeQuizzesArray,
        skinnyQuizzes: editSkinnyQuizzesArray,
        userFavs: editQuizUserFavs
      }
    
    default:
      return state
  }
}