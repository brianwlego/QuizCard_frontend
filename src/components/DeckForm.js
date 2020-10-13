import React from 'react'
import {connect} from 'react-redux'
import {createDeck, addCards} from '../redux/actions'
import styled from 'styled-components'
import { useState } from 'react'

function DeckForm(props){
  const [deckTitle, setDeckTitle] = useState("")
  const [deckCategory, setDeckCategory] = useState("")
  const [deckImg, setDeckImg] = useState("")

  const [cardArray, setCardArray] = useState([])
  const [cardFront, setCardFront] = useState("")
  const [cardBack, setCardBack] = useState("")

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

  const addCardsHandler = () => {
    const token = localStorage.getItem("token")
    props.addCards(token, cardArray)
    props.history.push('/profile')
  }

  const cardSubmit = (e) => {
    e.preventDefault()
    const newCard = {
      front: cardFront,
      back: cardBack,
      deck_id: props.newDeck.id
    }
    setCardArray([...cardArray, newCard])
    setCardFront("")
    setCardBack("")
  }


  const editHandler = (card) => {
    setCardFront(card.front)
    setCardBack(card.back)
    const idx = cardArray.indexOf(card)
    const newArray = [...cardArray]
    newArray.splice(idx, 1)
    setCardArray(newArray)
  }
  const deleteHandler = (card) => {
    const idx = cardArray.indexOf(card)
    const newArray = [...cardArray]
    newArray.splice(idx, 1)
    setCardArray(newArray)
  }

  const renderCardArray = () => {
    return cardArray.map(card => {
      return(
        <CardNav key={cardArray.indexOf(card)} >
          <p>{cardArray.indexOf(card) + 1}</p>
          <div>
            <button onClick={()=>editHandler(card)} >Edit</button>
            <button onClick={()=>deleteHandler(card)} >Delete</button>
          </div>
        </CardNav>
      )
    })
  }



  return(
    <DeckFormWrapper>
      {props.newDeck !== "" ? 
      <>
      <div id="new-deck-wrapper" >
        {props.newDeck.img_url === null ? null : 
          <img alt="" src={props.newDeck.img_url} />
        }
        <NewDeckContent>
          <h5>Title</h5>
          <StyledTitle>{props.newDeck.title}</StyledTitle>
          <h5>Category</h5>
          <StyledTitle>{props.newDeck.category}</StyledTitle>
        </NewDeckContent>
      </div>
      <CardNavWrapper>
        {cardArray.length > 0 ? renderCardArray() : null}
      </CardNavWrapper>
        <form onSubmit={cardSubmit}>
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
          <input type="submit" value="Add Card To Deck" />
        </form>
        <button onClick={addCardsHandler} >Finish Adding Cards & Create Deck</button>
      </>
      : 
      <>
        <h3>Create New FlashCard Deck</h3>
        <p>Start by inputing the Title and Category of your new deck.</p>
        <NewDeckForm onSubmit={deckSubmitHandler} >
          <NewDeckInputs 
            type="text"
            name="title"
            placeholder="Title..."
            value={deckTitle}
            onChange={(e)=> setDeckTitle(e.target.value)}
          />
          <NewDeckInputs 
            type="text"
            name="category"
            placeholder="Category..."
            value={deckCategory}
            onChange={(e)=> setDeckCategory(e.target.value)}
          />
          <NewDeckInputs
            type="file"
            name="deckImg" 
            accept="image/*" 
            onChange={(e)=>setDeckImg(e.target.files[0])}
          />
          <NewDeckInputs type="submit" value="Create Deck"/>
        </NewDeckForm>
      </> }
    </DeckFormWrapper>
  )
}
const DeckFormWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTitle = styled.h3`
  margin: 5px 0;
  text-align: center;
`
const NewDeckForm = styled.form` 
  display: flex;
  flex-direction: column;
  align-items:center;
`
const NewDeckInputs = styled.input` 
  padding: 10px;
`
const NewDeckContent = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 4%;
`
const CardNav = styled.div`
  border: 1px solid black;
  max-width: 8em;
  height: auto;
`
const CardNavWrapper = styled.div` 
  display: flex;
  align-items: center;
  margin: 0 0 5px 0;
`

const msp = (state) => {
  return {
    newDeck: state.newDeck
  }
}
const mdp = (dispatch) => {
  return {
    createDeck: (token, newDeck) => dispatch(createDeck(token, newDeck)),
    addCards: (token, cardsArray) => dispatch(addCards(token, cardsArray))
  }
}

export default connect(msp, mdp)(DeckForm)
