import React from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteDeck, populateDeckForm} from '../redux/actions'



function DeckCard (props) {
  
  const editHandler = () => {
    props.populateDeckForm(props.deck)
    props.history.push('/profile/newdeck')
  }
  const deleteHandler = () => {
    const token = localStorage.getItem('token')
    props.deleteDeck(token, props.deck)
  }
  const clickHandler = (e) => {
    if (e.target.className === "edit"){
      editHandler()
    } else if (e.target.className === "delete"){
      deleteHandler()
    } else{
      props.history.push(`/home/deck/${props.deck.id}`)
    }
  }
  
  
  return (
    <div className="card-wrapper" onClick={clickHandler}>
      <h3 className="card-h3">Deck</h3>
      <h3 className="card-title">{props.deck.title}</h3>
      <div className="card-content-wrapper">
        <div className="left-content">
          <p>cards</p>
          <p>category</p>
          <p>made by</p>
        </div>
        <div className="right-content">
          <p>{props.deck.cards.length}</p>
          <p>{props.deck.category}</p>
          <p>{props.deck.made_by}</p>
        </div>
      </div>
      {!props.profile ? null : 
        <div className="card-button-wrapper">
          <button className="edit">Edit</button>
          <button className="delete" >Delete</button>
        </div>
      }
    </div>
  )
}

const msp = (state) => {
  return{
    newDeck: state.newDeck
  }
}
const mdp =(dispatch) => {
  return{
    deleteDeck: (token, deck) => dispatch(deleteDeck(token, deck)), 
    populateDeckForm: (deck) => dispatch(populateDeckForm(deck))
  }
}


export default connect(msp, mdp)(withRouter(DeckCard))