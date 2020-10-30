import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import {addFav, removeFav} from '../redux/actions'


function DeckShow (props){
  const [deck, setDeck] = useState({})
  const [cardNum, setCardNum] = useState(0)
  const [front, setFront] = useState(false)
  const [favDeck, setFavDeck] = useState(false)

  useEffect(()=>{
    const deckId = window.location.pathname.split('/')[3]
    const token = localStorage.getItem('token')
    fetch(`https://quizcard-backend.herokuapp.com/api/v1/decks/${deckId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    .then(resp=>resp.json())
    .then(data => {
      if(data.fav_deck !== null){
        setFavDeck(data.fav_deck)
      }
      setDeck(data.deck)
    })
  }, [])

  const previous = () => {
    if (cardNum >= 1){
      const show = document.getElementById('deck-show-content')
      show.addEventListener('animationend', () => {
        show.className = "animate__fadeInLeft animate__animated animate__faster"
      });
      show.className = "animate__animated animate__fadeOutRight animate__faster"
      setCardNum(cardNum - 1)
      setFront(false)
    }
  }
  const next = () => {
    if (cardNum <= deck.cards.length - 2){
      const show = document.getElementById('deck-show-content')
      show.addEventListener('animationend', () => {
        show.className = "animate__animated animate__fadeInRight animate__faster"
      });
      show.className = "animate__animated animate__fadeOutLeft animate__faster"
      setCardNum(cardNum + 1)
      setFront(false)
    }
  }
  const favHandler = () => {
    const token = localStorage.getItem('token')
    if (!favDeck){
      const configObj = {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
        }
      }
      fetch(`http://localhost:3000/api/v1/decks/${deck.id}/favorite`, configObj)
      .then(resp=>resp.json())
      .then(data => {
        setFavDeck(data.fav_deck)
        props.addFav(deck)
      })
    } else {
      const configObj = {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
        }
      }
      fetch(`http://localhost:3000/api/v1/decks/${deck.id}/unfavorite`, configObj)
      .then(resp=>resp.json())
      .then(data => {
        if(data.success){
          setFavDeck(false)
          props.removeFav(deck)
        }
      })
    }
  }

  const clickHandler = (e) => {
    const ele = e.target
    ele.addEventListener('animationend', () => {
        ele.className = ""
      });
    if (front){
      ele.className = "animate__animated animate__flipInY animate__slow"
    } else {
      ele.className = "animate__animated animate__flipInY animate__slow"
    } 
    setFront(!front)
  }


  return (
    <>
    {deck.cards !== undefined ? 
      <div className="deck-wrapper">
        <div id="deck-content-wrapper">
          {deck.img_url !== null ? <img alt="" src={deck.img_url}/> : null}
        <div id="cat-title-wrapper">
          <h3>Category</h3>
          <h4>{deck.category}</h4>
          <h3>Title</h3>
          <h4>{deck.title}</h4>
        </div>
          <button onClick={favHandler} id="fav-button" >{!favDeck ? "Add This Deck To Your Favorites" : "Remove This Deck From Favorites"}</button>
        </div>
        <div id="deck-show-wrapper">
          <div id="deck-show-content" onClick={(e) => clickHandler(e)}  >
            <p>{!front ? deck.cards[cardNum].front : deck.cards[cardNum].back}</p>
          </div>
          <div className="deck-buttons-wrapper" >
            <button 
              onClick={previous}
              id={cardNum !== 0 ? null : 'disabled'}
              >previous</button>
            <p>{cardNum + 1} of {deck.cards.length}</p>
            <button 
              onClick={next}
              id={cardNum === deck.cards.length - 1 ? 'disabled' : null}
            >next</button>
          </div>
        </div>
      </div>
      :
      <div className="deck-wrapper">
        <h3>Loading...</h3>
      </div>
    }
    </>
  )
}

const mdp = (dispatch) => {
  return {
    addFav: (newFav) => dispatch(addFav(newFav)),
    removeFav: (fav) => dispatch(removeFav(fav))
  }
}

export default connect(null, mdp)(DeckShow)