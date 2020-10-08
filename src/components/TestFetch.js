import React from 'react'

export default class TestFetch extends React.Component {

  state = {
    cardArray: [
      {front: "California", back: "Welthiest State"},
      {front: "Alask", back: "Biggest State"},
      {front: "Rhode Island", back: "Smallesst State"}
    ]
  }
  
  fetchPostNewDeck = () => {
    //  WITHOUT ANY FILES ATTACHED  //
    const cards = this.state.array
    let formData = new FormData()
    formData.append('deck[category]', 'Geography')
    formData.append('deck[title]', 'US States')
    formData.append('length', cards.length)
    for (let i = 0; i < cards.length; i++) {
      formData.append(`card${i}[front]`, cards[i].front)
      formData.append(`card${i}[back]`, cards[i].back)
    }
    const configObj = {
      method: 'POST',
      body: formData
    }
    fetch('http://localhost:3000/api/v1/decks', configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // RETURNS DECK W/ALL CARDS  //
  }



  handleClick = () => {
    //  WITHOUT ANY FILES ATTACHED  //
    const cards = this.state.cardArray
    let formData = new FormData()
    formData.append('deck[category]', 'Geography')
    formData.append('deck[title]', 'US States')
    formData.append('length', cards.length)
    for (let i = 0; i < cards.length; i++) {
      formData.append(`card${i}[front]`, cards[i].front)
      formData.append(`card${i}[back]`, cards[i].back)
    }
    const configObj = {
      method: 'POST',
      body: formData
    }
    fetch('http://localhost:3000/api/v1/decks', configObj)
    .then(resp=>resp.json())
    .then(console.log)
    // RETURNS DECK W/ALL CARDS  //
  }


  render(){
    return(
      <div>
      <button onClick={this.handleClick} >Test Fetch</button>
      </div>
    )
  }

}