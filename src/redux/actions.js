

export const loginUser = (userObj, history) => {
  return function(dispatch){
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userObj })
    }
    fetch('http://localhost:3000/api/v1/login', configObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.message){
          dispatch({type: 'ERRORS', payload: [data.message]})
        } else if (data.user){
          localStorage.setItem("token", data.jwt);
          dispatch({type: 'ADD_USER', payload: data.user})
          history.push('/home')
        }
      })
  }
}

export const signUp = (newUser, history) => {
  return function(dispatch){
    const configObj = {
      method: 'POST',
      body: newUser
    }
    fetch('http://localhost:3000/api/v1/users', configObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.errors){
          dispatch({type: 'ERRORS', payload: data.errors})
          console.log(data)
        } else{
          localStorage.setItem("token", data.jwt)
          dispatch({type: 'ADD_USER', payload: data.user})
          history.push('/home')
        }
    })
  }
}

export const setSignUp = () => {
  return { type: 'SET_SIGNUP' }
}

export const checkToken = (token) => {
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(resp => resp.json())
    .then(data => {
      dispatch({type: 'ADD_USER', payload: data.user})
    })
  }
}

export const populateBrowse = () => {
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/home', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
    })
    .then(resp=>resp.json())
    .then(data => {
      dispatch({ type: 'POPULATE_BROWSE', payload: {decks: data.decks, quizzes: data.quizzes}})
    })
  }
}


export const populateHome = () => {
  return function(dispatch){
    fetch(`http://localhost:3000/api/v1/quizzes?page=1`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
    })
    .then(resp=>resp.json())
    .then(data => {
      dispatch(({type: 'POPULATE_HOME_QUIZZES', payload: {homeQuizzes: data.quizzes, meta: data.meta}}))
    })
    fetch(`http://localhost:3000/api/v1/decks?page=1`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
    })
    .then(resp=>resp.json())
    .then(data => {
      dispatch(({type: 'POPULATE_HOME_DECKS', payload: {homeDecks: data.decks, meta: data.meta}}))
    })
  }
}

export const addQuizzes = (quizMetaData, quizLength) => {
  return function(dispatch){
    fetch(`http://localhost:3000/${quizMetaData.pagination.links.next}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
    })
    .then(resp=>resp.json())
    .then(data => {
      dispatch(({type: 'ADD_HOME_QUIZZES', payload: {homeQuizzes: data.quizzes, meta: data.meta}}))
    })
  }
}

export const addDecks = (deckMetaData) => {
  return function(dispatch){
    fetch(`http://localhost:3000/${deckMetaData.pagination.links.next}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
    })
    .then(resp=>resp.json())
    .then(data => {
      dispatch(({type: 'ADD_HOME_DECKS', payload: {homeDecks: data.decks, meta: data.meta}}))
    })
  }
}

export const populateProfile = () => {
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/populate', {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(resp=>resp.json())
    .then(data => {
      dispatch(({type: 'POPULATE_PROFILE', payload: {userCreations: data.decks_quizzes, userFavs: data.user_favs, userScores: data.scores}}))
    })
  }
}



export const createDeck = (token, newDeck) => {
  return function(dispatch){
    const configObj = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: newDeck
    }
    fetch('http://localhost:3000/api/v1/decks', configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'NEW_DECK', payload: data.deck})
      })
  }
}

export const editDeck = (token, editDeck, deckId) => {
  return function(dispatch){
    const configObj = {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`},
      body: editDeck 
    }
    fetch(`http://localhost:3000/api/v1/decks/${deckId}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'EDIT_DECK', payload: data.deck})
      })
  }
}

export const finishCreateUpdateDeck = (deck) => {
  return {type: 'FINISH_DECK', payload: deck}
}

export const addCard = (token, card) => {
  return function(dispatch){
    const id = card.deck_id
    const configObj = {
      method: 'POST',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      },
      body: JSON.stringify({card: card})
    }
    fetch(`http://localhost:3000/api/v1/decks/${id}/cards`, configObj)
    .then(resp=>resp.json())
    .then(data => {
      dispatch({type: 'ADD_CARD', payload: data.card})
    })
  }
}

export const editCard = (token, card) => {
  return function(dispatch){
    const deckId = card.deck_id
    const id = card.id
    const configObj = {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      },
      body: JSON.stringify({ card: card })
    }
    fetch(`http://localhost:3000/api/v1/decks/${deckId}/cards/${id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'EDIT_CARD', payload: data.card})
      })
  }
}

export const deleteCard = (token, card) => {
  return function(dispatch){
    const deckId = card.deck_id
    const id = card.id
    const configObj = {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      }
    }
    fetch(`http://localhost:3000/api/v1/decks/${deckId}/cards/${id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'DELETE_CARD', payload: card.id})
      })
    }
  }

export const createQuiz = (token, newQuiz) => {
  return function(dispatch){
    const configObj = {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: newQuiz
    }
    fetch('http://localhost:3000/api/v1/quizzes', configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'NEW_QUIZ', payload: data.quiz})
      })
  }
}

export const editQuiz = (token, editQuiz, quizId) => {
  return function(dispatch){
    const configObj = {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`},
      body: editQuiz 
    }
    fetch(`http://localhost:3000/api/v1/quizzes/${quizId}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'EDIT_QUIZ', payload: data.quiz})
      })
  }
}

export const addQuestion = (token, newQuestion) => {
  return function(dispatch){
    const id = newQuestion.quiz_id
    const configObj = {
      method: 'POST',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      },
      body: JSON.stringify({ question: newQuestion })
    }
    fetch(`http://localhost:3000/api/v1/quizzes/${id}/questions`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'NEW_QUESTION', payload: data.question})
      })
  }
}

export const editQuestion = (token, question) => {
  return function(dispatch){
    const quizId = question.quiz_id
    const id = question.id
    const configObj = {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      },
      body: JSON.stringify({ question: question })
    }
    fetch(`http://localhost:3000/api/v1/quizzes/${quizId}/questions/${id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'EDIT_QUESTION', payload: data.question})
      })
  }
}

export const deleteQuestion = (token, question) => {
  return function(dispatch){
    const quizId = question.quiz_id
    const id = question.id
    const configObj = {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      }
    }
    fetch(`http://localhost:3000/api/v1/quizzes/${quizId}/questions/${id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'DELETE_QUESTION', payload: question.id})
      })
  }
}

export const deleteQuiz = (token, quiz) => {
  return function(dispatch){
    const configObj = {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      }
    }
    fetch(`http://localhost:3000/api/v1/quizzes/${quiz.id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'DELETE_QUIZ', payload: quiz})
      })
  }
}

export const deleteDeck = (token, deck) => {
  return function(dispatch){
    const configObj = {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accepts": "application/json"
      }
    }
    fetch(`http://localhost:3000/api/v1/decks/${deck.id}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        dispatch({type: 'DELETE_DECK', payload: deck})
      })
  }
}

export const populateQuizForm = (quiz) => {
  return function(dispatch){
    dispatch({type: 'POPULATE_QUIZ_FORM', payload: quiz})
  }
}

export const populateDeckForm = (deck) => {
  return function(dispatch){
    dispatch({type: 'POPULATE_DECK_FORM', payload: deck})
  }
}

export const populateQuizScore = (score) => {
  return { type: 'POPULATE_QUIZ_SCORE', payload: score}
}

export const resetQuizScore = () => {
  return { type: 'RESET_QUIZ_SCORE'}
}

export const addFav = (newFav) => {
  return { type: 'FAVORITE', payload: newFav }
}

export const removeFav = (fav) => {
  return { type: 'UNFAVORITE', payload: fav }
}

export const addScore = (score) => {
  return { type: 'ADD_SCORE', payload: score}
}

export const finishCreateUpdateQuiz = (quiz) => {
  return { type: 'FINISH_QUIZ', payload: quiz }
}
