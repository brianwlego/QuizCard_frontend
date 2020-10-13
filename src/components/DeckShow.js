import React, { useEffect, useState } from 'react';
import styled from 'styled-components'


function DeckShow (){
  const [deck, setDeck] = useState({})
  const [cardNum, setCardNum] = useState(0)
  const [front, setFront] = useState(false)

  useEffect(()=>{
    const deckId = window.location.pathname.split('/')[3]
    const token = localStorage.getItem('token')
    fetch(`http://localhost:3000/api/v1/decks/${deckId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }
    })
    .then(resp=>resp.json())
    .then(data => setDeck(data.deck))
  }, [])

  return (
    <div id="deck-show-wrapper" >
    {deck.cards !== undefined ? 
      <DeckWrapper>
        <h3>Category: {deck.category}</h3>
        <h4>Title: {deck.title}</h4>
        <Content onClick={() => setFront(!front)} >
          <p>{front ? deck.cards[cardNum].front : deck.cards[cardNum].back}</p>
        </Content>
        <p>{cardNum + 1} of {deck.cards.length}</p>
        <div id="buttons-wrapper" >
          <button
            onClick={ cardNum >= 1 ? () => setCardNum(cardNum - 1) : null}
          >previous</button>
          <button
            onClick={ cardNum <= deck.cards.length - 2 ? () => setCardNum(cardNum + 1) : null}
          >next</button>
        </div>
      </DeckWrapper>
      :
      <DeckWrapper>
        <h3>Loading...</h3>
      </DeckWrapper>
    }
    </div>
  )
}

const DeckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Content = styled.div`
  background-color: lightblue;
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 3%;
`


export default DeckShow