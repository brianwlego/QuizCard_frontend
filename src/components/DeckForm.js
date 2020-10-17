import React from 'react'
import {connect} from 'react-redux'
import {createDeck, addCard, editCard, deleteCard} from '../redux/actions'
import { useState } from 'react'

function DeckForm(props){
  const [deckTitle, setDeckTitle] = useState("")
  const [deckCategory, setDeckCategory] = useState("")
  const [deckImg, setDeckImg] = useState("")

  const [cardFront, setCardFront] = useState("")
  const [cardBack, setCardBack] = useState("")

  const [editCard, setEditCard] = useState(false)
  const [editCardId, setEditCardId] = useState("")


  const deckSubmitHandler = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    let formData = new FormData()
    formData.append('deck[title]', deckTitle)
    formData.append('deck[category]', deckCategory)
    formData.append('img', deckImg)

    props.createDeck(token, formData)
    setDeckImg("")
    setDeckTitle("")
    setDeckCategory("")
  }
  const createDeckHandler = () => {
    props.history.push('/profile')
  }
  const cardSubmit = (e) => {
    const token = localStorage.getItem('token')
    e.preventDefault()
    const newCard = {
      front: cardFront,
      back: cardBack,
      deck_id: props.newDeck.id
    }
    if (editCard){
      newCard.id = editCardId
      props.editCard(token, newCard)
    } else {
      props.addCard(token, newCard)
    }
    setCardFront("")
    setCardBack("")
    setEditCard(false)
    setEditCardId("")
  }
  const editHandler = (card) => {
    setCardFront(card.front)
    setCardBack(card.back)
    setEditCardId(card.id)
    setEditCard(true)
  }
  const deleteHandler = (card) => {
    const token = localStorage.getItem("token")
    props.deleteCard(token, card)
    setCardFront("")
    setCardBack("")
  }
  const renderCardArray = () => {
    return props.newCardArray.map(card => {
      const index = props.newCardArray.indexOf(card) + 1
      return(
        <div className="card-nav" key={index} >
          <p>Card {index}</p>
          <div>
            <button onClick={()=>editHandler(card)} >Edit</button>
            <button onClick={()=>deleteHandler(card)} >Delete</button>
          </div>
        </div>
      )
    })
  }



  return(
    <div id="deck-form-wrapper">
      {props.newDeck !== "" ? 
      <>
      <div id="new-deck-wrapper" >
        {props.newDeck.img_url === null ? null : 
          <img alt="" src={props.newDeck.img_url} />
        }
        <div id="deck-content">
          <h5>Title</h5>
          <h3>{props.newDeck.title}</h3>
          <h5>Category</h5>
          <h3>{props.newDeck.category}</h3>
        </div >
      </div>
      <div id="cards">
        {props.newCardArray.length > 0 ? renderCardArray() : null}
      </div>
        <form id="card-form" onSubmit={cardSubmit}>
          <input 
            type="text"
            name="front"
            placeholder="Front Card Content"
            value={cardFront}
            onChange={(e)=>setCardFront(e.target.value)}
          />
          <input 
            type="text"
            name="back"
            placeholder="Back Card Content"
            value={cardBack}
            onChange={(e)=>setCardBack(e.target.value)}
          />
          <input type="submit" value={editCard ? "Update Card" : "Add Card To Deck"} />
        </form>
        <button onClick={createDeckHandler} >Finish Adding Cards & Create Deck</button>
      </>
      : 
      <>
        <h3>Create New FlashCard Deck</h3>
        <p>Start by inputing the Title and Category of your new deck.</p>
        <form id="deck-form" onSubmit={deckSubmitHandler} >
          <input 
            type="text"
            name="title"
            placeholder="Title..."
            value={deckTitle}
            onChange={(e)=> setDeckTitle(e.target.value)}
          />
          <input 
            type="text"
            name="category"
            placeholder="Category..."
            value={deckCategory}
            onChange={(e)=> setDeckCategory(e.target.value)}
          />
          <input
            type="file"
            name="deckImg" 
            accept="image/*" 
            onChange={(e)=>setDeckImg(e.target.files[0])}
          />
          <input type="submit" value="Create Deck"/>
        </form>
      </> }
    </div>
  )
}

const msp = (state) => {
  return {
    newDeck: state.newDeck, 
    newCardArray: state.newCardArray
  }
}
const mdp = (dispatch) => {
  return {
    createDeck: (token, newDeck) => dispatch(createDeck(token, newDeck)),
    addCard: (token, card) => dispatch(addCard(token, card)),
    editCard: (token, card) => dispatch(editCard(token, card)),
    deleteCard: (token, card) => dispatch(deleteCard(token, card))
  }
}



export default connect(msp, mdp)(DeckForm)
