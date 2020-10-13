import React from 'react';
import styled from 'styled-components'

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

function QuizCard ({ quiz }) {

  return (
    <LinkWrapper href={`/home/quiz/${quiz.id}`} >
    <Wrapper>
      <h3>{quiz.title}</h3>
      <MiddleWrapper>
        <InnerWrapper>
          <p>Number of Cards</p>
          <p>{quiz.questions.length}</p>
        </InnerWrapper>
        <InnerWrapper>
          <p>Category</p>
          <p>{quiz.category}</p>
        </InnerWrapper>
      </MiddleWrapper>
      <Footer><footer><p>Made By: {quiz.made_by}</p></footer></Footer>
    </Wrapper>
    </LinkWrapper>
  )
}

export default QuizCard