import React from 'react'
import {connect} from 'react-redux'
import {createDeck, editDeck, deleteDeck, addCard, editCard, deleteCard, finishCreateUpdateDeck} from '../redux/actions'
import { useState } from 'react'

function DeckForm(props){
  const [deckTitle, setDeckTitle] = useState("")
  const [deckCategory, setDeckCategory] = useState("")
  const [deckImg, setDeckImg] = useState("")
  const [photoURL, setPhotoURL] = useState("")

  const [cardFront, setCardFront] = useState("")
  const [cardBack, setCardBack] = useState("")
  const [cardNum, setCardNum] = useState(props.newCardArray.length > 0 ? props.newCardArray.length + 1 : 1)

  const [editDeckContent, setEditDeckContent] = useState(false)

  const [editCard, setEditCard] = useState(false)
  const [editCardId, setEditCardId] = useState("")


  const deckSubmitHandler = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    let formData = new FormData()
    formData.append('deck[title]', deckTitle)
    formData.append('deck[category]', deckCategory)
    if (editDeckContent){
      const deckId = props.newDeck.id
      formData.append('newimg', deckImg)
      props.editDeck(token, formData, deckId)
      setEditDeckContent(false)
    } else{
      formData.append('img', deckImg)
      props.createDeck(token, formData)
    }
    setDeckImg("")
    setDeckTitle("")
    setDeckCategory("")
    setPhotoURL("")
  }
  const createDeckHandler = () => {
    const deck = props.newDeck
    deck.cards = props.newCardArray
    props.finishCreateUpdateDeck(deck)
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
      setCardNum(props.newCardArray.length + 1)
    } else {
      newCard.num = cardNum
      props.addCard(token, newCard)
      setCardNum(cardNum + 1)
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
    return props.newCardArray.sort((a, b) => a.num - b.num).map(card => {
      return(
        <div className="card-nav" key={card.id} >
          <span>{card.num}</span>
          <div className="card-p-wrapper">
            <p className="card-p-top">Front</p>
            <p className="card-p-bottom">{card.front}</p>
            <p className="card-p-top">Back</p>
            <p className="card-p-bottom">{card.back}</p>
            <div>
              <button onClick={()=>editHandler(card)} >Edit</button>
              <button onClick={()=>deleteHandler(card)} >Delete</button>
            </div>
          </div>
        </div>
      )
    })
  }
  const handleFile = (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setDeckImg(file)
      setPhotoURL(fileReader.result)
    }
    if (file){
      fileReader.readAsDataURL(file)
    }
  }
  // const removePhoto = () => {
  //   setPhotoURL("")
  //   setDeckImg("")
  //   props.newDeck.img_url = ""
  // }
  const renderDeckForm = () => {
    return (
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
            id="deckfile"
            type="file"
            name="deckImg" 
            accept="image/*" 
            hidden
            onChange={(e)=>handleFile(e)}
          />
          <label id="form-file-button" for="deckfile">{props.newDeck === "" ? "Select Deck Image" : "Change Image" }</label>
          {photoURL !== "" ? <img id="photo-preview" src={photoURL} /> : props.newDeck !== "" ? <img id="photo-preview" src={props.newDeck.img_url} /> : null}
          <input type="submit" value={props.newDeck === "" ? "Create Deck" : "Update Deck"}/>
        </form>
    )
  }
  const editDeck = () => {
    setDeckCategory(props.newDeck.category)
    setDeckTitle(props.newDeck.title)
    setEditDeckContent(true)
  }
  const deleteDeck = () => {
    const token = localStorage.getItem('token')
    props.deleteDeck(token, props.newDeck)
    props.history.push('/profile')
  }

  // console.log(props.newCardArray)

  return(
    <div id="deck-form-wrapper">
      {props.newDeck !== "" ? 
      <>
        {editDeckContent ? 
          renderDeckForm() :
        <div id="new-deck-wrapper" >
          {props.newDeck.img_url === null ? null : 
            <img alt="" src={props.newDeck.img_url} />
          }
          <div id="deck-content">
            <h5>Title</h5>
            <h3>{props.newDeck.title}</h3>
            <h5>Category</h5>
            <h3>{props.newDeck.category}</h3>
            <div>
                <button onClick={()=>editDeck()}>Edit</button>
                <button onClick={()=>deleteDeck()} >Delete</button>
              </div>
          </div >
        </div>
        }
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
          <input id="submit" type="submit" value={editCard ? "Update Card" : "Add Card To Deck"} />
          <button onClick={createDeckHandler} >Finish Adding Cards & Create Deck</button>
        </form>
      </>
      : 
      <div id="new-deck-form-wrapper">
        <h3>Create New FlashCard Deck</h3>
        <p>Start by inputing the Title and Category of your new deck.</p>
        {renderDeckForm()}
      </div> }
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
    editDeck: (token, deck, deckId) => dispatch(editDeck(token, deck, deckId)),
    deleteDeck: (token, deck) => dispatch(deleteDeck(token, deck)),
    addCard: (token, card) => dispatch(addCard(token, card)),
    editCard: (token, card) => dispatch(editCard(token, card)),
    deleteCard: (token, card) => dispatch(deleteCard(token, card)),
    finishCreateUpdateDeck: (deck) => dispatch(finishCreateUpdateDeck(deck))
  }
}



export default connect(msp, mdp)(DeckForm)
