import React from 'react';
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  border: 2px solid black;
  border-radius: 5%;
  margin: 10px;
`
const Footer = styled.p`
  margin: 0;
`
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const MiddleWrapper = styled.div`
display: flex;
align-items: center;
`
const LinkWrapper = styled.a` 
  text-decoration: none;
`

function DeckCard ({ deck }) {

  return (
    <LinkWrapper href={`/home/deck/${deck.id}`} >
    <Wrapper>
      <h3>{deck.title}</h3>
      <MiddleWrapper>
        <InnerWrapper>
          <p>Number of Cards</p>
          <p>{deck.cards.length}</p>
        </InnerWrapper>
        <InnerWrapper>
          <p>Category</p>
          <p>{deck.category}</p>
        </InnerWrapper>
      </MiddleWrapper>
      <Footer><footer><p>Made By: {deck.made_by}</p></footer></Footer>
    </Wrapper>
    </LinkWrapper>
  )
}

export default DeckCard