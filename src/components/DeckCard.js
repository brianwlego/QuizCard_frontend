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
      <h3>{props.deck.title}</h3>
      <div className="middle-wrapper">
        <div className="inner-wrapper">
          <p>Number of Cards</p>
          <p>{props.deck.cards.length}</p>
        </div>
        <div className="inner-wrapper">
          <p>Category</p>
          <p>{props.deck.category}</p>
        </div>
      </div>
      <p>Made By: {props.deck.made_by}</p>
      {!props.profile ? null : 
        <div>
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